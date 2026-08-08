import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import orderService from "../../Services/order.service";

const OrderEdit = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const orderData = location.state;
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [orderTotalPrice, setOrderTotalPrice] = useState("");
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // LOAD ORDER
  useEffect(() => {

    const loadOrder = async () => {

      try {

        setLoading(true);

        let data = orderData;


        // When refreshing page fetch from backend
        if (!data && id) {

          const response =
            await orderService.getSingleOrder(id);

          data = response.data;

        }


        if (!data) {

          setErrorMessage("Order not found");
          return;

        }

        setEmployeeId(
          data.employee_id ?? ""
        );


        setCustomerId(
          data.customer_id ?? ""
        );


        setDeviceId(
          data.device_id ?? ""
        );


        setOrderTotalPrice(
          data.order_total_price ?? ""
        );


        setEstimatedCompletionDate(
          data.estimated_completion_date
          ? data.estimated_completion_date.substring(0,16)
          : ""
        );


        setInternalNotes(
          data.notes_for_internal_use ?? ""
        );


        setOrderStatus(
          data.order_status ?? ""
        );


      } catch(error) {

        console.log(
          "LOAD ORDER ERROR:",
          error
        );

        setErrorMessage(
          "Failed to load order"
        );

      } finally {

        setLoading(false);

      }

    };


    loadOrder();


  }, [id, orderData]);


  // UPDATE ORDER
  const handleUpdate = async (e) => {

    e.preventDefault();


    try {

      setSuccessMessage("");
      setErrorMessage("");



      // Only send changed values
      const updatedOrder = {};



      if(employeeId !== "") {

        updatedOrder.employee_id =
          Number(employeeId);

      }


      if(customerId !== "") {

        updatedOrder.customer_id =
          Number(customerId);

      }


      if(deviceId !== "") {

        updatedOrder.device_id =
          Number(deviceId);

      }


      if(orderTotalPrice !== "") {

        updatedOrder.order_total_price =
          Number(orderTotalPrice);

      }


      if(estimatedCompletionDate !== "") {

        updatedOrder.estimated_completion_date =
          estimatedCompletionDate;

      }



      if(internalNotes.trim() !== "") {

        updatedOrder.notes_for_internal_use =
          internalNotes;

      }



      if(orderStatus !== "") {

        updatedOrder.order_status =
          Number(orderStatus);

      }



      const orderId =
        orderData?.order_id || id;



      await orderService.updateOrder(
        orderId,
        updatedOrder
      );



      setSuccessMessage(
        "Order updated successfully"
      );


      setTimeout(()=>{

        navigate("/admin/order");

      },1000);



    } catch(error) {


      console.log(
        "UPDATE ERROR:",
        error
      );


      setErrorMessage(
        "Failed to update order"
      );


    }

  };

  if(loading){

    return (

      <div className="container py-5">

        <h4>
          Loading order...
        </h4>

      </div>

    );

  }

  return (

    <div className="admin-edit-container">


      <h2 style={{
        color:"#0b1c5d",
        fontWeight:"700"
      }}>

        Edit Order #{orderData?.order_id || id}

      </h2>



      {successMessage && (

        <div className="alert alert-success mt-3">

          {successMessage}

        </div>

      )}



      {errorMessage && (

        <div className="alert alert-danger mt-3">

          {errorMessage}

        </div>

      )}

      <form
        onSubmit={handleUpdate}
        className="mt-4"
      >

        <div className="mb-3">

          <label>
            Employee ID
          </label>

          <input

            type="number"

            className="form-control"

            value={employeeId}

            onChange={(e)=>
              setEmployeeId(e.target.value)
            }

          />

        </div>

        <div className="mb-3">

          <label>
            Customer ID
          </label>

          <input

            type="number"

            className="form-control"

            value={customerId}

            onChange={(e)=>
              setCustomerId(e.target.value)
            }

          />

        </div>
        <div className="mb-3">

          <label>
            Device ID
          </label>

          <input

            type="number"

            className="form-control"

            value={deviceId}

            onChange={(e)=>
              setDeviceId(e.target.value)
            }

          />

        </div>

        <div className="mb-3">

          <label>
            Total Price
          </label>

          <input

            type="number"

            className="form-control"

            value={orderTotalPrice}

            onChange={(e)=>
              setOrderTotalPrice(e.target.value)
            }

          />

        </div>

        <div className="mb-3">

          <label>
            Estimated Completion Date
          </label>

          <input

            type="datetime-local"

            className="form-control"

            value={estimatedCompletionDate}

            onChange={(e)=>
              setEstimatedCompletionDate(e.target.value)
            }

          />

        </div>

        <div className="mb-3">

          <label>
            Internal Notes
          </label>

          <textarea

            className="form-control"

            value={internalNotes}

            onChange={(e)=>
              setInternalNotes(e.target.value)
            }

          />

        </div>

        <div className="mb-3">

          <label>
            Order Status
          </label>


          <select

            className="form-control"

            value={orderStatus}

            onChange={(e)=>
              setOrderStatus(e.target.value)
            }

          >

            <option value="">
              Keep Current Status
            </option>

            <option value="1">
              Received
            </option>

            <option value="2">
              In Progress
            </option>

            <option value="3">
              Completed
            </option>


          </select>
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

          onClick={() =>
            navigate("/admin/order")
          }

        >

          CANCEL

        </button>
      </form>


    </div>

  );

};


export default OrderEdit;
