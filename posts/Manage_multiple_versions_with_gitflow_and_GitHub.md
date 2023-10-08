created: 2022-09-04T21:46:01+00:00
tags: [actions]

# Manage multiple versions with GitFlow and GitHub

Imagine this: you want to add a new feature to a repository, but it involves a change that will break backward compatibility. You could release a new major version, but other repositories may depend on the previous version of your software.

In this case, you need to support an older version simultaneously with the next major version. Git-flow is a branching strategy that eases the burden of managing multiple versions, but it can be tricky to implement in a team using GitHub. Git-flow provides several benefits:

* Git-flow uses distinct and obvious branch roles: branches are annotated with their specific purpose (feature, release, support, and hotfix).
* Git-flow keeps consistent histories: patches made for older versions are automatically merged back into the development branch.
* Git-flow uses a release branching strategy that ensures a higher quality of released software, and lower stress for the developer managing branches, as release branches are deleted as soon as they are merged and tagged.

These benefits can be achieved in a GitHub setting, but it requires some manual automation with GitHub actions.

"feature/feature\_name" into "develop"
----------

All new features should be created from the "develop" branch. No GitHub actions need to run on pull requests created for feature branches into the develop branch, but you may choose to enforce labels on your features. Making sure the feature in review has the appropriate semantic versioning label will be helpful for when we create "release" branches later.

When a pull request is finished for a feature branch, the PR can be squashed and merged into the "develop" branch. Squashing should **not** occur for release or hotfix PRs for reasons that will be mentioned.

Draft a release on "release/\*" push
----------

By far the best benefit of using git-flow with GitHub is that releases can be properly reviewed in the form of a pull request. A GitHub action could be created that drafts a release when a push is made to a "release/\*" branch.

```
on:
  push:
    branches:
      - release/**
      - hotfix/**

permissions:
  contents: read

jobs:
  update_release_draft:
    permissions: write-all
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
        with:
          fetch-depth: 0

      # NEW RELEASES
      # Check if this is a release branch
      - name: Check For release branch
        id: is_release_branch
        continue-on-error: true
        run: |
          FILTEREDBRANCHNAME=$(git branch | grep "\* release")
          echo "filtered_branch_name=$FILTEREDBRANCHNAME" >> $GITHUB_OUTPUT

      # Get the release tag
      - name: Get release Tag
        id: get_release_tag
        if: steps.is_release_branch.outputs.filtered_branch_name != ''
        run: |
          RELEASETAG=$(git branch | grep \* | sed -re "s/(\* )?release\///;s/(\w+)\/.*/\1/g")
          echo "release_tag=$RELEASETAG" >> $GITHUB_OUTPUT

      # Draft Release with release branch
      - name: Draft Release with release branch
        id: update_release_draft_with_release_branch
        if: steps.is_release_branch.outputs.filtered_branch_name != ''
        uses: tiller1010/release-drafter@master
        with:
          tag: ${{ steps.get_release_tag.outputs.release_tag }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Publish the draft release when "release/\*" PRs are merged
----------

Before merging a release PR, the changes should be reviewed again by another developer. If any additional commits are made, these should **not** be squashed before merging. This way, the other branches are aware of the additional commits, and merges can occur more smoothly, bringing the fixes along too.

When a release branch is merged into "main" the release that was drafted for that pull request can be published. Doing so creates a tag. After the corresponding release is published, a changelog PR is automatically created, approved, and merged. Them, the "release/\*" branch can be automatically deleted by a GitHub action.

```
on:
  pull_request:
    types:
      - closed
    branches:
      - main
      - support/*

jobs:
  publish_release:
    if: ${{ github.event.pull_request.merged }}
    runs-on: ubuntu-latest
    steps:

      - name: Checkout
        uses: actions/checkout@master
        with:
          fetch-depth: 0

      - name: Get repository name
        id: repo-name
        uses: tiller1010/get-repo-name-action@master
        with:
          with-owner: 'true'

      - name: Get release id
        id: get_release_id
        run: |
          TOKEN="${{ secrets.GITHUB_TOKEN }}"
          REPO="${{ steps.repo-name.outputs.repository-name }}"
          RELEASEID=$(curl -H "Accept: application/vnd.github+json" -H "Authorization: token $TOKEN" https://api.github.com/repos/$REPO/releases)
          RELEASEID=$(echo "$RELEASEID" | grep \"id\"  | head -n 1 | sed -re "s/[a-z]*//g;s/[-|,|:|'\"]//g;s/\s//g")
          echo "release_id=$RELEASEID" >> $GITHUB_OUTPUT
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Payload info
        id: payload_info
        uses: tiller1010/payload-info-action@master
        continue-on-error: true

      # START HOTFIX RELEASE RE-DRAFT
      # END HOTFIX RELEASE RE-DRAFT

      - name: Publish release
        uses: eregon/publish-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          release_id: ${{ steps.get_release_id.outputs.release_id }}


      # START CHANGELOG PORTION
      - name: Check if releasing for a support branch
        id: is_support_branch
        continue-on-error: true
        run: |
          FILTEREDBRANCHNAME=$(git branch | grep "\* support")
          echo "filtered_branch_name=$FILTEREDBRANCHNAME" >> $GITHUB_OUTPUT

      - name: Generate Changelog
        id: changelog
        if: steps.is_support_branch.outputs.filtered_branch_name == ''
        uses: tiller1010/tag-changelog@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          exclude_types: other,doc,chore
          config_file: .github/tag-changelog-config.js

      - name: Output Changelog
        id: output_changelog
        if: steps.is_support_branch.outputs.filtered_branch_name == ''
        run: TAGCONTENT="${{ steps.changelog.outputs.changelog }}";CHANGELOG=$(cat CHANGELOG.md);CHANGELOG=$(echo "$CHANGELOG" | sed -e "s/# Changelog//");echo -e "# Changelog\n\n$TAGCONTENT$CHANGELOG" > CHANGELOG.md

      - name: Create Pull Request
        id: create_pr
        if: steps.is_support_branch.outputs.filtered_branch_name == ''
        uses: peter-evans/create-pull-request@v4
        with:
          title: Auto-Update CHANGELOG.md
          commit-message: Updated CHANGELOG.md
          labels: automerge

      - name: Approve PR
        if: steps.is_support_branch.outputs.filtered_branch_name == ''
        uses: hmarr/auto-approve-action@v3
        with:
          review-message: Auto approved automated PR
          pull-request-number: ${{ steps.create_pr.outputs.pull-request-number }}
          github-token: ${{ secrets.SOME_USERS_PAT }}

      - name: Auto merge
        if: steps.is_support_branch.outputs.filtered_branch_name == ''
        uses: pascalgn/automerge-action@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PULL_REQUEST: ${{ steps.create_pr.outputs.pull-request-number }}
          MERGE_DELETE_BRANCH: true

      - name: Post Changelog Checkout
        if: steps.is_support_branch.outputs.filtered_branch_name == ''
        uses: actions/checkout@master
        with:
          ref: main
      # END CHANGELOG PORTION

      # START MERGE INTO DEVELOP
      # END MERGE INTO DEVELOP

      # Remove the release or hotfix branch after publishing
      - name: Remove PR branch
        uses: dawidd6/action-delete-branch@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branches: ${{ steps.payload_info.outputs.branch }}
```

Merge main into develop
----------

After a release branch is merged into the main branch, it should be merged back into the "develop" branch.

```
...
      # START MERGE INTO DEVELOP
      # Merge support changes into develop so they can be included in the next release
      - name: Merge support -> develop
        if: steps.is_support_branch.outputs.filtered_branch_name != ''
        uses: devmasx/merge-branch@master
        with:
          type: now
          target_branch: develop
          github_token: ${{ secrets.GITHUB_TOKEN }}
          message: Merged support into develop

      # Merge main changes into develop
      - name: Merge main -> develop
        if: steps.is_support_branch.outputs.filtered_branch_name == ''
        uses: devmasx/merge-branch@master
        with:
          type: now
          from_branch: main
          target_branch: develop
          github_token: ${{ secrets.GITHUB_TOKEN }}
          message: Merged main into develop
      # END MERGE INTO DEVELOP
...
```

Re-Draft releases on "hotfix/\*" push
----------

When you must support a previous minor or major version, you should start by checking out that tag. Make sure to checkout the latest patch for that minor or major version. Then, you should create a "support/\*.x" branch.

Support branches should function similarly to the "main" branch. Tags will be created when "hotfix/\*" branches are merged into it, and commits should **not** be added to it directly.

After creating the support branch, a "hotfix/\*" branch with the next patch number should be created. These are similar to the "release/\*" branches, as they should be reviewed in a pull request, and when they are merged.

Again, **do not** squash commits for hotfix branches before merging. That way, when support branch commits are merged back into the develop and main branches, the same commit SHAs appear, and the changes are shown as merged.

Git actions should **publish** the drafted release and delete the "hotfix/\*" branch (similar to when a "release/\*" branch is merged, see the above example).

```
...
      # START HOTFIX RELEASE RE-DRAFT
      - name: Check if releasing a hotfix
        id: is_hotfix_branch
        continue-on-error: true
        run: |
          PRBRANCH="${{ steps.payload_info.outputs.branch }}"
          FILTEREDBRANCHNAME=$(echo "$PRBRANCH" | grep "hotfix")
          echo "filtered_pr_branch_name=$FILTEREDBRANCHNAME" >> $GITHUB_OUTPUT

      - name: Get hotfix Tag from branch name
        id: get_hotfix_tag
        if: steps.is_hotfix_branch.outputs.filtered_pr_branch_name != ''
        run: |
          HOTFIXBRANCH="${{ steps.payload_info.outputs.branch }}"
          RELEASETAG=$(echo "$HOTFIXBRANCH" | sed -re "s/(\* )?hotfix\///;s/(\w+)\/.*/\1/g")
          echo "release_tag=$RELEASETAG" >> $GITHUB_OUTPUT

      - name: Get Last Tag created on this branch
        id: last_tag
        if: steps.is_hotfix_branch.outputs.filtered_pr_branch_name != ''
        run: |
          LASTTAG=$(git describe --tags | sed -re "s/-.+//")
          echo "last_tag_on_branch=$LASTTAG" >> $GITHUB_OUTPUT

      # Re-Draft Release with hotfix tag
      # "release-drafter" works by checking the changes of merged pull requests.
      # For support or main branch hotfixes, there is only one merged hotfix PR, which is only now available,
      # so we need to re-draft the release with the recently merged PR for release notes.
      - name: Draft Release with hotfix tag
        id: update_release_draft_with_hotfix_branch
        if: steps.is_hotfix_branch.outputs.filtered_pr_branch_name != ''
        uses: tiller1010/release-drafter@master
        with:
          tag: ${{ steps.get_hotfix_tag.outputs.release_tag }}
          last_tag: ${{ steps.last_tag.outputs.last_tag_on_branch }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      # END HOTFIX RELEASE RE-DRAFT
...
```

Merge support into main and develop
----------

If a bug existed in a previous version, it is likely that it still exists in the latest version too. Similar to "release/\*" branches that are merged into the main branch, support branches too should be merged into the main branch.

This happens by first creating a feature PR to merge a cloned support branch into the develop branch. There is, however, a higher potential for this to produce merge conflicts. In that case, a developer must resolve the conflict on their own, and push the resolved merge into the feature branch, set to merge into develop.

Now that the support branch is merged into develop, it can be merged into the main branch. This should be done in another release pull request.

I hope you decide to use git-flow in your projects! It adds much-needed sanity to the management of multiple versions of software.

