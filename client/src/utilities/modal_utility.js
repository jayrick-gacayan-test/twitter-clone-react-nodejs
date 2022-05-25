import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle";

const showModal = (modalElement) => {
    const bsModal = new bootstrapBundle.Modal(
        modalElement,
        {
            backdrop: "static",
            keyboard: false
        }
    );

    bsModal.show();
}

const hideModal = (modalElement) => {
    const bsModal = bootstrapBundle.Modal.getInstance(modalElement);

    bsModal.hide();
}

const ModalUtility = {
    showModal,
    hideModal
}

export default ModalUtility;

