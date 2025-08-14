import React from "react";
import {
  PayPalButtons,
  PayPalScriptProvide,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
const PayPalButton = ({amount,onSuccess,onError}:{amount:any,onSuccess:any,onError:any}) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ART1cQul6XSm6NiELNBMSBPJoaKvd4DQkgS7BeruB3B1mPl5WpKjuprKBX2NmIc8j3eTDdLbVd6GtGUk",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data : any, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
