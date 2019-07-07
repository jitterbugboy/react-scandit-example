import React, { Component } from 'react';
import { render } from 'react-dom';
import { Barcode, BarcodePicker, ScanSettings, configure } from "scandit-sdk";
import Hello from './Hello';
import './style.css';
const licenseKey = "AQe9thnEBGJdQp37IRMc7htFawpGLLavqjXz/BVWNfkWfZbpmXlc+x5YnwliZ7KVSE9XJ2RQlp7HTayz+05vWwZ50BapIzuGHXX3sIdQturiTbEPJkYXu39k942EUbWZnDRfgqsgeqAqPZMRVDhE6NMEEzPLB3X4yeDCNT06s50cAcsz6YKVUIrlGTdZ7vrxA37FmG75u5tmT166gMC0TCjEdkmkWFWhWjrBIX3ZZE6eXVPt1sU1OOLSANxl2KvL45T3SaONODPJNmMDkC8J675zyb/NLe4XjHOuLyG+DqO5zdyUMFet/PKo3WtjGyhEU1hWxNKpl0IpJ1XHMwVklD91M4RXQA1BsMZrrfPhbv/t8uMIW0v96fLsXxYLbZq70jCOGfK9+d1zDoeFX1n6l1T7pSlZM5aoRPU8VFb3k0UFw8RK+7TsPJp9F5RlXhHbYRYfpd/5hWnIwoLgpR9CKe+hDkVJsFrf9MjJ5Jt5rNeT6CvDYmsbEL7OMeGs04ORUq4C80UZdJmeM6WqKlJSLjLlxfwHnrERFUGAZuLBhm9IREYMsZPp2VY90A9z6XWEuD5sgf7oNYvW3qSEVfKNHEjNGNzZvXg6NGZMxKy7xLNKfFzg10wu5E5SSdqGI2Sx+v4dXf5r2vRQHRsY4nkTSzvzKTvIDaELyQmd/K6DUwlNxQwSJKacvt/NELXv0JN0c8HZqPEI2NZBIWdzVN1lUoF5iytZQ9czINaO+AN/b+ERLOnXT4qg5zIT41Ke1ZBq8x3Ee4CFCrNsMFUoyGQaHO+E8F4FeQRw+ihrjy1rh9ry7UXxqlYlZFMjHGyUu15A1aD4iEU=";

const alternateLicense = "AR7NBRbEC+FZEslnBTT41oEcEW1AKpDlgiq7aVpZehljXTNjJEHxreN9EpfAcJqfDXZb18wnWxkycqLDTX5e8QUXvHpiHCCahke6rwpCgUqXGVVmR29+LeJmScW4Osc1Ik7pL4p24QrcfW/Q13sgc25c/LDkVGgnw1eltMASgMaWMZY5hTdlHT31+4v4hSID1lpU3S9IAPuDrSBwQy2y4FJFbI8ilnB1GF8mzHVwZg3dtpKhQTpqOYbpmW5GLZ3qMLBatWGJ2YOaxcaGjbV7Lb3vw5/HE9oJYLWd9P7rlfh8GCUUvFedVni9NGX3L40CrjFdlafHhBYNqGbrtpSrzL6XNqNFQZqlsV/vi0TLyn7H10lFDnaH7L9yp5AiRYBFwn2gwt4kOXhfwh9scT4q5BsVnGva8bf1pkyy4Qky3IzKp73/bOW2tRbR5BSqi3kFbMP7bYoI6pefOcno9uBacxCfkHwWBV7lnDotDdCT5DlOOCcRygr7Mua5TSGp/ZTMehq2Wkm07Dj6S8lgQiwF3Wd61FWaiDLG/6Mcl/BkC8GZo4+gweINbi2aNyZrAQmZt6O+rO9GdH7i9gLSstFxf4rvlXwgrgZXIDnqMfsRVAOu09Pvis2Q+wrffjPuYsWNIZFfcFNypzuFw7aA7PauFxhU66k0kKfN6PIXb2ldU/KsqaerrsOqTBhbYzgTrtjlLI6TlOFTeoNWHbGQjkAulQYpiPMJpAJEUuFXpCZ1tIrON6XNy0a7uLS8oIxYhSeXzTAOfZr7J9pf5+j2MECsjSNj/g/+xuU6Fn0TcW6HbHO76kAY4STpWh7dgPzfDY6wluD2bibEHazpCOqXnAPaDpp33WZdqo0=";

class App extends Component {
  constructor() {
    console.log("i am here")
    super();
    this.state = {};
    configure(licenseKey, {
      engineLocation: "/"

    })
  }



  onButtonClick() {
    this.setState({ openClickTs: performance.now() })
    console.log("setting, o");

    BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
      playSoundOnScan: true,

      vibrateOnScan: true,

    }).then(function (barcodePicker) {
      // barcodePicker is ready here to be used (rest of the tutorial code should go here)


      var scanSettings = new ScanSettings({
        enabledSymbologies: ["ean13"],
        codeDuplicateFilter: 1000
      });
      barcodePicker.applyScanSettings(scanSettings);

      barcodePicker.onReady(() => { console.log("now we are ready") });
      barcodePicker.onScan(function (scanResult) {
        alert(scanResult.barcodes.reduce(function (string, barcode) {
          return string + Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "\n";
        }, ""));
      });
    });
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          This takes very long to open
        </p>
        <button onClick={() => this.onButtonClick()}>Click Me to launch scandit</button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
