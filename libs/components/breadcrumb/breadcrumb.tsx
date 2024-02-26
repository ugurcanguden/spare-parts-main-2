import { BreadCrumbList } from '@cryptobigbang-constants';
import { LanguageManager } from '@cryptobigbang-core';
import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function BreadCrumb() {
  const { translate } = LanguageManager();
  const router = useRouter();
  const [breadcrumb, setBreadcrumb] = useState<any[]>([ ]);


  useEffect(()=>{
    const subRoute = router.pathname; 
    let item = BreadCrumbList.find(r=>r.breadCrumbKey == subRoute);
    let tempBreadcrumb:any[]=[];
    item?.breadcrumb?.forEach((element:any,index:number) => {
      tempBreadcrumb.push({
        ...element,
        key : index,
        title : translate(`breadcrumb.${element.title}`)
      });
    });  
    setBreadcrumb(tempBreadcrumb); 
  },[router.pathname])
  return (<Breadcrumb items={breadcrumb} />   )
}
