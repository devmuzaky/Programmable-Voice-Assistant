import {AfterViewInit, Component, Input} from '@angular/core';

// import * as dat from 'dat.gui';

@Component({
  selector: 'app-audio-visualizer',
  templateUrl: './audio-visualizer.component.html',
  styleUrls: ['./audio-visualizer.component.scss']
})
export class AudioVisualizerComponent implements AfterViewInit {

  WIDTH = 1000;
  HEIGHT = 400;
  shuffle = [1, 3, 0, 4, 2];
  opts = {
    smoothing: 0.6,
    fft: 8,
    minDecibels: -70,
    scale: 0.2,
    glow: 10,
    color1: [203, 36, 128],
    color2: [41, 200, 192],
    color3: [24, 137, 218],
    fillOpacity: 0.6,
    lineWidth: 1,
    blend: "screen",
    shift: 50,
    width: 60,
    amp: 1
  };
  // gui = new dat.GUI();
  context;
  analyser;
  freqs;
  n = <any>navigator;
  ctx: CanvasRenderingContext2D;
  canvas

  constructor() {

  }

  private _startVisualizer: boolean;

  get startVisualizer(): boolean {
    return this._startVisualizer;
  }

  @Input() set startVisualizer(value: boolean) {
    this._startVisualizer = value;

    if (this.startVisualizer) {
      this.start();
    }
  }

  ngOnInit() {
    // this.gui.close();
    //
    // this.gui.addColor(this.opts, "color1");
    // this.gui.addColor(this.opts, "color2");
    // this.gui.addColor(this.opts, "color3");
    // this.gui.add(this.opts, "fillOpacity", 0, 1);
    // this.gui.add(this.opts, "lineWidth", 0, 10).step(1);
    // this.gui.add(this.opts, "glow", 0, 100);
    // this.gui.add(this.opts, "blend", ["normal", "multiply", "screen", "overlay", "lighten", "difference"]);
    // this.gui.add(this.opts, "smoothing", 0, 1);
    // this.gui.add(this.opts, "minDecibels", -100, 0);
    // this.gui.add(this.opts, "amp", 0, 5);
    // this.gui.add(this.opts, "width", 0, 60);
    // this.gui.add(this.opts, "shift", 0, 200);

    // navigator.mediaDevices.getUserMedia =
    //   navigator.mediaDevices.getUserMedia ||
    //   navigator.mediaDevices.webkitGetUserMedia ||
    //   navigator.mediaDevices.mozGetUserMedia ||
    //   navigator.mediaDevices.msGetUserMedia;

    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    this.n.getUserMedia = this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia;
  }


  ngAfterViewInit() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  onStream(stream) {
    const input = this.context.createMediaStreamSource(stream);
    input.connect(this.analyser);
    requestAnimationFrame(() => this.visualize());
  }

  onStreamError(e) {
    document.body.innerHTML = "<h1>This pen only works with https://</h1>";
    console.error(e);
  }

  range(i) {
    return Array.from(Array(i).keys());
  }


  freq(channel, i) {
    const band = 2 * channel + this.shuffle[i] * 6;
    return this.freqs[band];
  }

  scale(i) {
    const x = Math.abs(2 - i);
    const s = 3 - x;
    return s / 3 * this.opts.amp;
  }

  path(channel) {

    const color = this.opts[`color${channel + 1}`].map(Math.floor);

    this.ctx.fillStyle = `rgba(${color}, ${this.opts.fillOpacity})`;

    this.ctx.strokeStyle = this.ctx.shadowColor = `rgb(${color})`;

    this.ctx.lineWidth = this.opts.lineWidth;
    this.ctx.shadowBlur = this.opts.glow;

    const m = this.HEIGHT / 2;


    const offset = (this.WIDTH - 15 * this.opts.width) / 2;

    const x = this.range(15).map(i => offset + channel * this.opts.shift + i * this.opts.width);

    const y = this.range(5).map(i => Math.max(0, m - this.scale(i) * this.freq(channel, i)));

    const h = 2 * m;

    this.ctx.beginPath();
    this.ctx.moveTo(0, m);
    this.ctx.lineTo(x[0], m + 1);

    this.ctx.bezierCurveTo(x[1], m + 1, x[2], y[0], x[3], y[0]);
    this.ctx.bezierCurveTo(x[4], y[0], x[4], y[1], x[5], y[1]);
    this.ctx.bezierCurveTo(x[6], y[1], x[6], y[2], x[7], y[2]);
    this.ctx.bezierCurveTo(x[8], y[2], x[8], y[3], x[9], y[3]);
    this.ctx.bezierCurveTo(x[10], y[3], x[10], y[4], x[11], y[4]);

    this.ctx.bezierCurveTo(x[12], y[4], x[12], m, x[13], m);

    this.ctx.lineTo(1000, m + 1);
    this.ctx.lineTo(x[13], m - 1);


    this.ctx.bezierCurveTo(x[12], m, x[12], h - y[4], x[11], h - y[4]);
    this.ctx.bezierCurveTo(x[10], h - y[4], x[10], h - y[3], x[9], h - y[3]);
    this.ctx.bezierCurveTo(x[8], h - y[3], x[8], h - y[2], x[7], h - y[2]);
    this.ctx.bezierCurveTo(x[6], h - y[2], x[6], h - y[1], x[5], h - y[1]);
    this.ctx.bezierCurveTo(x[4], h - y[1], x[4], h - y[0], x[3], h - y[0]);
    this.ctx.bezierCurveTo(x[2], h - y[0], x[1], m, x[0], m);

    this.ctx.lineTo(0, m);

    this.ctx.fill();
    this.ctx.stroke();
  }

  visualize() {
    this.analyser.smoothingTimeConstant = this.opts.smoothing;
    this.analyser.fftSize = Math.pow(2, this.opts.fft);
    this.analyser.minDecibels = this.opts.minDecibels;
    this.analyser.maxDecibels = 0;
    this.analyser.getByteFrequencyData(this.freqs);

    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;

    this.path(0);
    this.path(1);
    this.path(2);

    requestAnimationFrame(() => this.visualize());
  }

  start(constraints?: MediaStreamConstraints) {
    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.n.mediaDevices.getUserMedia({audio: true})
      .then(MediaStream => {
        this.onStream(MediaStream);
      }).catch(error => {
      this.onStreamError(error);
    });
  }
}
