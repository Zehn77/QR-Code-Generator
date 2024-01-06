import React, { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

function App() {
  const printRef = React.useRef();

  const [text, setText] = useState('');

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleButton = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }

  };

  return (
    <div className="App">
      <header>
        <h1 className="text-center p-4">Welcome to QR Code Generator</h1>
      </header>
      <section>
        <div className="container ">
          <div className="row text-center">
            <div className="form-group">
              <textarea value={text} onChange={handleText} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="col-12 text-center">
              <button onClick={handleButton} className="btn btn-primary m-3 mx-auto" disabled={text === ''}>Download QR Code</button>
            </div>
            {/* <div className="col-12">
              <div ref={printRef} className="qr-code-container">
                <QRCode value={text}/>
              </div>
            </div> */}

            
          </div>
        </div>
        <div className="text-center col-md-12" >
          <div className="p-3" ref={printRef} style={{ display: 'inline-block' }}>
            <QRCode fgColor='#3078b9' value={text} />
          </div>
        </div>
        
      </section>

      <footer className="m-3">
        Copyright &copy; 2024  - Developed by: Zekhniddin
      </footer>
    </div>
  );
}

export default App;
