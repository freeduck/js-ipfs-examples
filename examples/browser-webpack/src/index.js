import { EditorView, minimalSetup } from "codemirror"
import { create } from 'ipfs-core'

async function main() {
  let ipfs;
  let editor = new EditorView({
    extensions: minimalSetup,
    parent: document.body
  })

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
}

main();
