'use strict';
// 参考:
// https://www.sist.ac.jp/~suganuma/kougi/animation/JavaScript/velocity2/velocity2.htm

// 支点(frictionless pivot)
const frictionless_pivot_x = 200;
const frictionless_pivot_y = 50;

const k = 0;
const dt = 0.01;
const g = 9.8;
const m = 1.0;

const start = () => {

    let r = 0.5, I = 4.0 * r * r / 12.0;
    let a20 = 20.0 * Math.PI / 180.0; // 角度20°をラジアンに変換
    let p1 = k / (I + m * r * r);
    let q = m * r * g / (I + m * r * r);
    let alpha1 = -0.5 * p1, beta1 = 0.5 * Math.sqrt(4 * q - p1 * p1);
    let c12 = 0.5 * Math.PI;
    let t = 0;

    // 描画
    let canvas = document.getElementById('canvas_e');
    canvas.width  = 400;   // キャンバス要素の幅
    canvas.height = 600;   // キャンバス要素の高さ
    let ctx = canvas.getContext('2d');
    const len = canvas.height - 100;

    const draw = () => {
        t += dt;

        // 重心(massive bob)
        const z = a20 * Math.exp(alpha1 * t) * Math.sin(beta1 * t + c12);

        const massive_bob_x = frictionless_pivot_x + len * Math.sin(z);
        const massive_bob_y = frictionless_pivot_y + len * Math.cos(z);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgb(0, 255, 0)";
        ctx.beginPath();
        ctx.moveTo(frictionless_pivot_x, frictionless_pivot_y);
        ctx.lineTo(Math.floor(massive_bob_x), Math.floor(massive_bob_y));
        ctx.stroke();
    };

    setInterval(draw, 40);
};
