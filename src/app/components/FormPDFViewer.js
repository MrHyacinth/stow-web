import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
 
const FormPDFViewer = ({ url }) => {
    return (
        <PDFViewer
            document={{
                url
            }}
            scale={2}
            canvasCss="checkoutAgreementPDF"
        />
    )
}
 
export default FormPDFViewer
