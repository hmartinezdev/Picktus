import Photo from '@assets/svg/pix.svg';
import colors from '@constants/colors';
import React, { Component } from 'react';

class Loader extends Component {
  public render(): React.ReactElement<Loader> {
    return (
      <div className="container">
        <Photo className="photo photo--first" />
        <Photo className="photo photo--second" />
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 8rem;
            height: 8rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3D(-50%, -50%, 0);
            z-index: 1000;
            width:100%;
            min-height: 100vh;
            background-color: ${colors.primary}cd;
          }

          .photo {
            max-width: 8rem;
            max-height: 8rem;
            position: absolute;
          }

          .photo--second {
            animation: photo 3000ms ease-out infinite;
          }

          .photo--second .check {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            stroke-width: 4;
            stroke: #b3e099;
            stroke-meterlimit: 10;
            animation: check 3000ms ease-out infinite;
          }

          @keyframes photo {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }

            20% {
              opacity: 1;
            }

            40% {
              transform: translateY(0%);
              opacity: 1;
            }

            80%, 100% {
              opacity: 1;
            }
          }

          @keyframes check {
            0% {
              opacity:0;
              stroke-dashoffset: 1000;
            }

            40% {
              opacity:0;
              stroke-dashoffset: 1000;
            }

            80%, 100% {
              opacity:1;
              stroke-dashoffset: 0;
            }
          }

          
        `}</style>
      </div>
    );
  }
}

export default Loader;
