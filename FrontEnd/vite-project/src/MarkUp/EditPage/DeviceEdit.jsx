import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import deviceService from "../../Services/device.service";

const EditDevice = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const deviceData = location.state;


  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  const [deviceYear, setDeviceYear] = useState("");
  const [deviceMake, setDeviceMake] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [deviceAccessoriesReceived, setDeviceAccessoriesReceived] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceSerial, setDeviceSerial] = useState("");
  const [deviceProblem, setDeviceProblem] = useState("");




  // LOAD DEVICE DATA
  useEffect(() => {


    const loadDevice = async () => {

      try {

        setLoading(true);


        let data = deviceData;



        // When page refreshed fetch from backend
        if(!data && id){

          const response =
            await deviceService.getSingleDevice(id);

          data = response.data;

        }



        if(!data){

          setMessage("Device not found");
          setMessageType("error");

          return;

        }




        setDeviceYear(
          data.device_year ?? ""
        );


        setDeviceMake(
          data.device_make ?? ""
        );


        setDeviceModel(
          data.device_model ?? ""
        );


        setDeviceType(
          data.device_type ?? ""
        );


        setDeviceAccessoriesReceived(
          data.device_accessories_received ?? ""
        );


        setDeviceBrand(
          data.device_brand ?? ""
        );


        setDeviceSerial(
          data.device_serial ?? ""
        );


        setDeviceProblem(
          data.device_problem ?? ""
        );



      } catch(error){


        console.log(
          "LOAD DEVICE ERROR:",
          error
        );


        setMessage(
          "Unable to load device"
        );


        setMessageType(
          "error"
        );



      } finally {


        setLoading(false);


      }


    };


    loadDevice();


  },[id,deviceData]);







  // UPDATE DEVICE
  const handleSubmit = async(e)=>{


    e.preventDefault();


    try{


      setMessage("");
      setMessageType("");



      const updatedDevice = {};




      // Partial update

      if(deviceYear !== ""){

        updatedDevice.device_year =
          Number(deviceYear);

      }



      if(deviceMake.trim() !== ""){

        updatedDevice.device_make =
          deviceMake;

      }



      if(deviceModel.trim() !== ""){

        updatedDevice.device_model =
          deviceModel;

      }



      if(deviceType.trim() !== ""){

        updatedDevice.device_type =
          deviceType;

      }



      if(deviceAccessoriesReceived.trim() !== ""){

        updatedDevice.device_accessories_received =
          deviceAccessoriesReceived;

      }



      if(deviceBrand.trim() !== ""){

        updatedDevice.device_brand =
          deviceBrand;

      }



      if(deviceSerial.trim() !== ""){

        updatedDevice.device_serial =
          deviceSerial;

      }



      if(deviceProblem.trim() !== ""){

        updatedDevice.device_problem =
          deviceProblem;

      }




      await deviceService.updateDevice(
        id,
        updatedDevice
      );



      setMessage(
        "Device updated successfully"
      );


      setMessageType(
        "success"
      );



      setTimeout(()=>{


        navigate("/admin/DeviceInfo");


      },1000);




    }catch(error){


      console.log(
        "UPDATE DEVICE ERROR:",
        error
      );


      setMessage(
        "Update failed"
      );


      setMessageType(
        "error"
      );



    }


  };







  if(loading){

    return (

      <div className="container py-5">

        <h4>
          Loading Device...
        </h4>

      </div>

    );

  }







return (

<div className="admin-edit-container">


<h2
style={{
color:"#0b1c5d",
fontWeight:"700"
}}
>
Edit Device #{id}
</h2>





{message && (

<div
className={`alert ${
messageType === "success"
? "alert-success"
: "alert-danger"
} mt-3`}
>

{message}

</div>

)}






<form
onSubmit={handleSubmit}
className="mt-4"
>



<div className="mb-3">

<label>
Device Year
</label>

<input

type="number"

className="form-control"

value={deviceYear}

onChange={(e)=>
setDeviceYear(e.target.value)
}

/>

</div>






<div className="mb-3">

<label>
Device Make
</label>

<input

type="text"

className="form-control"

value={deviceMake}

onChange={(e)=>
setDeviceMake(e.target.value)
}

/>

</div>







<div className="mb-3">

<label>
Device Model
</label>

<input

type="text"

className="form-control"

value={deviceModel}

onChange={(e)=>
setDeviceModel(e.target.value)
}

/>

</div>







<div className="mb-3">

<label>
Device Type
</label>

<input

type="text"

className="form-control"

value={deviceType}

onChange={(e)=>
setDeviceType(e.target.value)
}

/>

</div>







<div className="mb-3">

<label>
Accessories Received
</label>

<input

type="text"

className="form-control"

value={deviceAccessoriesReceived}

onChange={(e)=>
setDeviceAccessoriesReceived(e.target.value)
}

/>

</div>








<div className="mb-3">

<label>
Device Brand
</label>

<input

type="text"

className="form-control"

value={deviceBrand}

onChange={(e)=>
setDeviceBrand(e.target.value)
}

/>

</div>








<div className="mb-3">

<label>
Device Serial
</label>

<input

type="text"

className="form-control"

value={deviceSerial}

onChange={(e)=>
setDeviceSerial(e.target.value)
}

/>

</div>







<div className="mb-3">

<label>
Problem
</label>


<textarea

className="form-control"

rows="4"

value={deviceProblem}

onChange={(e)=>
setDeviceProblem(e.target.value)
}

/>


</div>







<button

type="submit"

className="btn btn-primary me-2"

>

UPDATE

</button>






<button

type="button"

className="btn btn-secondary cancel"

onClick={()=>navigate("/admin/device")}

>

CANCEL

</button>





</form>


</div>


);


};


export default EditDevice;