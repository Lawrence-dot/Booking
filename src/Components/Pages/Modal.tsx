export interface ModalType {
  title: string;
  type: string;
  function?: () => void;
  custom?: string | Element | JSX.Element;
  deletebank?: () => void;
  editbank?: () => void;
}

export const ShowModal = (modalcontent: ModalType) => {
  const closemodal = () => {
    document.getElementById("modal")!.remove();
  };

  const showbtns = () => {
    if (modalcontent.type === "yesno") {
      return `<div class="yesnobtns mx-auto justify-center mb-2 text-sm mt-7 flex flex-row">
          <button class="py-1 px-3" id="nobtn"> No </button>
          <button class="bg-blue-600 border py-1 px-4 hover:border-blue-600 hover:bg-white hover:text-blue-600 rounded-md text-white" id="yesbtn"> Yes </button>
        </div>`;
    } else if (modalcontent.type === "custom") {
      return modalcontent!.custom;
    } else {
      return `<div id="okbtn" class="okbtn border text-sm py-2 mx-auto rounded-md text-white cursor-pointer bg-blue-500 hover:border-blue-600 hover:bg-white hover:text-blue-600 mt-4 mb-2"> OK </div>`;
    }
  };

  const html = `<div class="modal" id="modal">
    <div class="modal-content dark:bg-black rounded-md text-lg md:text-xl flex flex-col px-4 py-9 h-fit bg-white">
      <span class="text-red-600 modal-close cursor-pointer font-bold" id="closebtn"> X </span>
      <h2 class="text-center font-semibold mt-2 mx-3"> ${
        modalcontent.title
      } </h2>
      <div className="buttons text-white">
        ${showbtns()}
      </div>
    </div>
  </div>`;

  if (
    !document.getElementById("app")?.contains(document.getElementById("modal"))
  ) {
    document.getElementById("app")!.insertAdjacentHTML("afterbegin", html);
    document.getElementById("closebtn")!.onclick = () => {
      closemodal();
    };
    if (modalcontent.type === "ok") {
      document.getElementById("okbtn")!.onclick = () => {
        closemodal();
      };
    } else if (modalcontent.type === "yesno") {
      document.getElementById("nobtn")!.onclick = () => {
        closemodal();
      };
      document.getElementById("yesbtn")!.onclick = () => {
        closemodal();
        modalcontent.function && modalcontent?.function();
      };
    } else if (modalcontent.type === "custom") {
      modalcontent.deletebank &&
        (document.getElementById("deleter")!.onclick = async () => {
          closemodal();
          modalcontent.deletebank && modalcontent.deletebank();
        });

      modalcontent.editbank &&
        (document.getElementById("editbankdetails")!.onclick = async () => {
          closemodal();
          modalcontent.editbank && modalcontent.editbank();
        });

      document.getElementById("custom")!.onclick = async () => {
        modalcontent.function && modalcontent!.function();
        closemodal();
      };
    }
  }
};
