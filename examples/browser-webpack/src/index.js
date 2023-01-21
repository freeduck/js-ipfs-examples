import {EditorState} from "@codemirror/state"
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"
import { create } from 'ipfs-core'

async function main() {
  let ipfs;

  ipfs = await create({
    repo: String(Math.random() + Date.now()),
    init: { alogorithm: 'ed25519' }
  });




  const cat = async (cid) => {
    const decoder = new TextDecoder()
    let content = ''

    for await (const chunk of ipfs.cat(cid)) {
      content += decoder.decode(chunk, {
        stream: true
      })
    }

    return content;
  }

  const text = await cat('bafkreidyrjfprszjkuuivi34cmxjgskyq6mrw5lke5rnw4rrfykal3fhsa');
  console.log(text);
  let startState = EditorState.create({
    doc: text,
    extensions: [keymap.of(defaultKeymap)]
  })

  let view = new EditorView({
    state: startState,
    parent: document.body
  })

}

main();
