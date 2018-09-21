// @flow
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';
import {assetUrl} from 'fusion-core';

const FullHeightDiv = styled('div', {
  height: '100%',
  backgroundColor: '#FFFFFF',
});

const Title = styled('h1', {
  color: '#FFFFFF',
  fontSize: '42px',
  fontWeight: 'normal',
});

const ResourceLink = styled('a', {
  color: '#FFFFFF',
  textDecoration: 'none',
  marginRight: '20px',
  fontSize: '20px',
  ':hover': {
    textDecoration: 'underline',
  },
});

class Home extends React.Component {
  componentDidMount() {
    // Original canvas logic: https://jsfiddle.net/yckart/fL6rcujw/
    const canvas = this.canvas;
    const alienCycleRef = this.alienCycleRef;
    const context = canvas.getContext('2d');
    let tcanvas = document.createElement('canvas');
    let tcontext = tcanvas.getContext('2d');
    let height = (tcanvas.height = canvas.height = window.innerHeight);
    let width = (tcanvas.width = canvas.width = window.innerWidth);
    let num_points = (width / 4) | 0; // number of points
    let points = [];
    let max = 75; // max height deviation
    let jitter = 1; // this is the random jitter between points
    let start_y = height - 150; // start position (Y scale)
    let scale_x = width / num_points; // width of the lines
    let tx = 0; // temp x for scrolling
    let sto; // scroll timeout

    window.onresize = e => {
      height = tcanvas.height = canvas.height = window.innerHeight;
      width = tcanvas.width = canvas.width = window.innerWidth;
      num_points = (width / 4) | 0; // number of points
      start_y = height - 150; // start position (Y scale)
      scale_x = width / num_points; // width of the lines
      run();
    };

    // document.onclick = run; // onclick generate a new landscape
    run(); // generate a new landscape

    function create() {
      // loop over all of the points and reset them (or set them)
      for (var i = 0; i <= num_points; i++) {
        points[i] = start_y;
      }
      // start the recursive midpoint function (see below)
      midpoint(0, num_points, max, jitter);
    }

    function render() {
      // Clear the temp canvas
      tcontext.clearRect(0, 0, width, height);

      // Create terrain path
      tcontext.beginPath();

      // Move to the start position
      tcontext.moveTo(0, points[0]);
      for (let i = 0; i < points.length - 1; i += 2) {
        // step two points at a time
        if (Math.random() > 0.5) {
          // curve line, looks more realistic to me
          tcontext.quadraticCurveTo(
            i * scale_x,
            points[i],
            (i + 1) * scale_x,
            points[i + 1]
          );
        } else {
          // because of the curve option, we nede to draw two line segments per iteration
          tcontext.lineTo(i * scale_x, points[i]);
          tcontext.lineTo((i + 1) * scale_x, points[i + 1]);
        }
      }
      // to fill we need to connect the line segments back to the start.
      tcontext.lineTo(width, points[0]);
      tcontext.lineTo(width, height);
      tcontext.lineTo(0, height);
      tcontext.fillStyle = '#96B55F';
      tcontext.fill();
      tcontext.closePath();
    }

    function run() {
      create();
      render();

      // rendering is complete! Start the scroll.
      scroll();
    }

    function scroll() {
      // clear the timeout or subsequent clicks speeds up things
      cancelAnimationFrame(sto);

      // clear the canvas
      context.clearRect(0, 0, width, height);

      // draw the image twice, starting from the temporary x for the loop
      // then append the image again to itself.
      context.drawImage(tcanvas, --tx, 0);
      context.drawImage(tcanvas, tx + width, 0);

      // Draw aliencycle
      const index = Math.abs(tx) % points.length;
      context.drawImage(alienCycleRef, -50, points[index] - 400);

      // if the temp x + the width is zero
      // we have exhausted the first image and are displaying the second
      // jump back to the first.
      if (tx + width === 0) {
        tx = 0;
      }
      // loop
      sto = requestAnimationFrame(scroll);
    }

    function midpoint(p1, p2, max, jitter) {
      // get the midpoint index
      let mid = Math.round((p1 + p2) / 2);
      // if points are on eachother, or the midpoint is on either return
      if (p2 - p1 <= 1 || p1 === mid || p2 === mid) {
        return;
      }
      // the displacement is (avg of the points) + max*(+-jitter)
      let d =
        (points[p1] + points[p2]) / 2 +
        max * (Math.random() * (jitter * 2) - jitter);
      // set the midpoint displacement value
      points[mid] = d;
      // midpoint the new line segment to the left, and to the right.
      midpoint(p1, mid, max / 2, jitter);
      midpoint(mid, p2, max / 2, jitter);
    }
  }

  handlePromotions = e => {
    if (e.target.textContent === 'Promotions') {
      e.preventDefault();
      e.target.innerHTML = 'E-mail: promotions@alienrides.com';
      e.target.href = 'mailto:promotions@alienrides.com';
    }
  };

  render() {
    return (
      <FullHeightDiv>
        <style>
          {`
        html,body,#root{height:100%; padding:0; margin: 0}
        html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
        body{margin:0;}
        button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
        input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
        canvas {
          display: block;
          touch-action: none;
          user-select: none;
        }
        `}
        </style>
        <div
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 200,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Title>AlienRides</Title>
          <ResourceLink href="https://www.youtube.com/alienrides">
            YouTube
          </ResourceLink>
          <ResourceLink href="https://twitter.com/alienrides">
            Twitter
          </ResourceLink>
          <ResourceLink href="http://instagram.com/alienrides/">
            Instagram
          </ResourceLink>
          <ResourceLink href="https://www.facebook.com/AlienRides/">
            Facebook
          </ResourceLink>
          <ResourceLink href="https://www.patreon.com/AlienRides">
            Patreon
          </ResourceLink>
          <ResourceLink href="https://alienrides.storenvy.com/">
            Apparel
          </ResourceLink>
          <ResourceLink href="https://ewheels.com/alien">Shop</ResourceLink>
          <ResourceLink href="#" onClick={this.handlePromotions}>
            Promotions
          </ResourceLink>
        </div>
        <div
          id="world"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: '#6A97E5',
          }}
        >
          <img
            src={assetUrl('../static/cycle.png')}
            ref={el => (this.alienCycleRef = el)}
            style={{display: 'none'}}
          />
          <canvas ref={el => (this.canvas = el)} />
        </div>
      </FullHeightDiv>
    );
  }
}

export default Home;
