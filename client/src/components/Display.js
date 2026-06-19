import { useState } from "react";
import "./Display.css"
const Display = ({ contract, account }) => {
    const [data, setData] = useState("")
    const getData = async () => {
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        console.log("Contract instance:", contract);
        console.log("Target account:", Otheraddress || account);
        try {
            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);
            }
        }
        catch (e) {
            alert("You don't have access...!");
        }
        
        if (!dataArray) {
            console.error("Contract returned no data !");
            return;
        }

        const isEmpty = Object.keys(dataArray).length === 0;

        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            // console.log(str);
            // console.log(str_array);
       const images = str_array.map((item, i) => {
       const finalUrl = `https://ipfs.io/ipfs/${item.replace(
       "ipfs://",
       "",
     )}`;
     console.log("Attempting to load:", finalUrl); // See this in your F12 console
     return (
       <a href={finalUrl} key={i} target="_blank">
         <img src={finalUrl} alt="new" className="image-item" />
       </a>
     );
   });
            setData(images);
        } else {
            alert("No image to display !");
        }

    };
    return (<>
        <div className="image-list">{data}</div>
        <input type="text" placeholder="Enter Address" className="address"></input>
        <button className="center button" onClick={getData}>Get Data</button>
    </>);
};

export default Display;