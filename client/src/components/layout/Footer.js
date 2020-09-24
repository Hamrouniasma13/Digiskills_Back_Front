// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="footer bg-dark text-white mt-5 p-4 text-center">
//       Copyright &copy; {new Date().getFullYear()} DIGISKILLS
//     </footer>
//   );
// }
import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright © Digiskills 2020</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
