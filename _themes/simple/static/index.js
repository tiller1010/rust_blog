import { default as wasmbin } from './pkg/blog_wasm_bg.wasm';
import init, { im_blue } from 'blog_wasm';
//import { get_page_content } from 'blog_wasm';

(async () => {
  await init(wasmbin);
  im_blue();
})();

console.log('hello from js');


