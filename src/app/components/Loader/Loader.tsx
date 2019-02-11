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
            position: relative;
            width: 100%;
            height: 100%;
          }

          .photo {
            max-width: 100%;
            max-height: 100%;
            position: absolute;
          }

          .photo--second {
            animation: photo 3000ms ease-out infinite;
          }

          .photo--second .check {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            stroke-width: 22;
            fill: none;
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

            80%,
            100% {
              opacity: 1;
            }
          }

          @keyframes check {
            0% {
              stroke-dashoffset: 1000;
            }

            40% {
              stroke-dashoffset: 1000;
              fill: ${colors.green};
            }

            80%,
            100% {
              fill: ${colors.lightGreen};
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Loader;
