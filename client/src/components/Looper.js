import React from "react"
export default function Looper(){
    let looperarray = []
    let minuss = 15
      for(let j=1;j< minuss;j++)
      {
        looperarray.push(j)
      }
      return(
        looperarray.map((ind)=>
        <tr>
        
            <td className="text-center">-</td>
            <td className="text-center">-</td>
            <td className="text-center">-</td>
            <td className="text-center">-</td>
            <td className="text-center">-</td>
        </tr>
        )
      )
    
    }