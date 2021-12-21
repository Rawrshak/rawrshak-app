import Modal from "./Modal";
import Metamask from '../assets/images/metamask.png';

function InstallMetamaskModal({
  show,
  setShow
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  return (
    <Modal isOpen={show} setIsOpen={setShow}>
      <div className="flex text-offWhite flex-col bg-gray justify-center">
        <div className="flex justify-center">
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center"
          >
            <img className="flex justify-center cursor-pointer w-24 h-24" src={Metamask} alt="Metamask" />
          </a>
        </div>
        <div className="flex justify-center text-lg mt-8">
          Please install&nbsp;
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center underline"
          >
            Metamask
          </a>
        </div>
      </div>
    </Modal >
  );
}

export default InstallMetamaskModal;