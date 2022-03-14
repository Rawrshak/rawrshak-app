import { useHistory } from 'react-router-dom';
import asset_logo from '../assets/images/heroCubesFlattened.png';
import contract_logo from '../assets/images/heroCubesFlattened copy.png';

function CreatePage() {

  const history = useHistory();

  return (
    <div className="flex flex-col flex-col-1 pt-10">
      <div className="flex flex-col text-offWhite text-xxxl text-center w-full">
        What do you want to CREATE?
      </div>
      <div className="w-full flex flex-row mt-5">
        <div 
          onClick={() => history.push('create/sc_creation/')}
          className="w-1/2 flex flex-col rounded-xl">
          <div className="flex flex-col text-offWhite text-xl text-center w-full">
            Create a COLLECTION?
          </div>
          <img 
            src={contract_logo}
            alt='contract_logo'
            className='h-100 w-100 m-5 rounded-xl border-darkBlue100 border-2 p-5'
          />
          <div className="flex flex-col text-offWhite text-xl text-center w-full">
            Create a new smart contract to group assets by.
          </div>
        </div>
        <div 
          onClick={() => history.push('/chooseCollection/')}
          className="w-1/2 flex flex-col">
          <div className="flex flex-col text-offWhite text-xl text-center w-full">
            Create an ASSET?
          </div>
          <img 
            src={asset_logo}
            alt='asset logo'
            className='h-100 w-100 m-5 rounded-xl border-darkBlue100 border-2 p-5'
          />
          <div className="flex flex-col text-offWhite text-xl text-center w-full">
            Create a new asset in an existing smart contract.
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;