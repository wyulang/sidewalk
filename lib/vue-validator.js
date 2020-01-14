import * as vaild from './validator';
function createHtml(el, binding, vnode) {
  let vhtml = `<section style="position:absolute;top:20px;left:0;">
                  <div style="display: flex;align-items: center;">
                    <span style="background-color: #d81e06;height:15px;width:15px;text-align: center;color:#fff;border-radius: 100%;line-height:16px;font-size: 12px;">!</span>
                    <span style="margin-left:6px;color:#D50000;font-weight: 700;font-size: 12px;">${binding.value.text}</span>
                  </div>
               </section>`;
  return vhtml;
}
export default {

  componentUpdated: (el, binding, vnode, oldVnode) => {
    el.style.position = "relative";
    // vnode.data.attrs.vaild("fawefawefawefaw")
    binding.value.change('hhhhhhhhhhhh')
    // debugger;
    // let html=createHtml(el, binding, vnode);
    // if(binding.value.change){
    //   el.innerHTML=html;
    // }else{
    //   el.innerHTML=""
    //   binding.value.text="textddddd"
    // }
    // vnode.data.model.callback('fawefafaew');
  }
}