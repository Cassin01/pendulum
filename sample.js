'use strict';

// 支点(frictionless pivot)
const frictionless_pivot_x = 200;
const frictionless_pivot_y = 50;

const dt = 0.5;
const g = 9.8;
const deg2rad = (deg) => deg * (Math.PI / 180);
const rad_0 = deg2rad(20);

const start = () => {

    let t = 0;
    let rad = rad_0;
    let rad_v = 0;

    // 描画
    let canvas = document.getElementById('canvas_e');
    canvas.width  = 400;   // キャンバス要素の幅
    canvas.height = 600;   // キャンバス要素の高さ
    let ctx = canvas.getContext('2d');
    const len = canvas.height - 100;

    ctx.lineWidth = 3;

    const draw = () => {
        t += dt;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 重心(massive bob)
        const draw_line = (massive_bob_x, massive_bob_y, color) => {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(frictionless_pivot_x, frictionless_pivot_y);
            ctx.lineTo(Math.floor(massive_bob_x), Math.floor(massive_bob_y));
            ctx.stroke();
        };

        // 数値計算解
        // 角度の更新
        rad_v += (-g * rad / len) * dt;
        rad += rad_v * dt;

        draw_line(
            frictionless_pivot_x + len * Math.sin(rad),
            frictionless_pivot_y + len * Math.cos(rad),
            "#3F7A63");

        //  厳密解
        const exact_rad = rad_0 * Math.cos(Math.sqrt(g / len) * t) ;
        draw_line(
            frictionless_pivot_x + len * Math.sin(exact_rad),
            frictionless_pivot_y + len * Math.cos(exact_rad),
            "#FFFFFF");
    };

    setInterval(draw, 0.01);
};
