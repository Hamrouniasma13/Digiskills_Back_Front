import React from "react";
import jsPDF from 'jspdf'
import Button from '@material-ui/core/Button';


const Chip = ({ title, background, handleClose, id, jsPdfGenerator }) => {
  const close = () => {
    handleClose(id);
  };
  jsPdfGenerator = () => {

    var doc = new jsPDF('p', 'pt');



    doc.text(20, 20, 'this is default text ')

    // set the foont 
    doc.setFont('courier')

    // doc.setFontType('normal')
    doc.text(20, 30, 'this is text with courier font')
    // save the document 
    doc.save("generated.pdf")



  }

  return (



    <div className="card" style={{ width: "18rem;" }}>
      <div className="card-body" >
        <h5 className="card-title" >{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{background}</h6>
        <p className="card-text"></p>
        {/* <button
          onClick={close}
          type="button"
          className="chip__action close "
          aria-label="Close"

        > */}
        {/* <span aria-hidden="true">&times;</span>
        </button> */}



        <Button variant="outlined" color="primary">

          Plan
            </Button>
        <Button variant="contained" color="primary">
          Ajouter
            </Button>

      </div>

    </div>



    // <div className="badge badge-secondary chip">
    //   <div className="chip__inner">

    //     <span className="chip__title">{text}</span>
    //     <span className="chip__title">{d1}</span>

    //     <button
    //       onClick={close}
    //       type="button"
    //       className="chip__action close "
    //       aria-label="Close"

    //     >
    //       <span aria-hidden="true">&times;</span>
    //     </button>
    //   </div>
    // </div>
  );
};

export default Chip;
