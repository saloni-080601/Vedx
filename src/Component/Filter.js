import React from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from '@material-ui/core';
 function Filter({status}){
  return (
    <>
        <Button variant='outlined' sx={{marginRight:"20px"}}>Filter<FilterListIcon/>

        <select >
        <option value=""> Status</option>
            {
                status.map((statu)=>(
                    <option value={statu} key={statu} sx={{dislay:"none"}}>
                        {statu}
                    </option>
                 ) )}
        
        </select>
        </Button>
        
    </>
  )
}export default Filter
