import { DocumentDefinitionsService } from '@cryptobigbang-services';
import { removeDuplicates } from 'guden-core';
import { useEffect, useState } from 'react';
const DocumentBase = () => { 
  const [values, setValues] = useState<any[]>([]);
  const {getContentTypes} = DocumentDefinitionsService();
  const getOptions = async () => {
    const response = await getContentTypes();
    let tempResponse = removeDuplicates(response);
    setValues(tempResponse?.map((r: any,index:number) => (
      {
        key : index,
        value: r,
        label: r
      }
    )));
    
  }
  useEffect(()=>{ 
    getOptions()
  },[])
  return {
    values
  }
}
export default DocumentBase;
