'use strict';

// 支点(frictionless pivot)
const frictionless_pivot_x = 200;
const frictionless_pivot_y = 50;

const dt = 0.1;
const g = 9.8;
const deg2rad = (deg) => deg * (Math.PI / 180);
const rad_0 = deg2rad(20);

const start = () => {

    let rad = rad_0;
    let rad_v = 0;

    let rad_theta = rad_0;
    let rad_v_theta = 0;

    // 描画
    let canvas = document.getElementById('canvas_e');
    canvas.width  = 400;   // キャンバス要素の幅
    canvas.height = 600;   // キャンバス要素の高さ
    let ctx = canvas.getContext('2d');
    const len = canvas.height - 100;

    ctx.lineWidth = 3;

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 重心(massive bob)
        const draw_line = (massive_bob_x, massive_bob_y, color) => {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(frictionless_pivot_x, frictionless_pivot_y);
            ctx.lineTo(Math.floor(massive_bob_x), Math.floor(massive_bob_y));
            ctx.stroke();
        };

        // sinθ で計算
        // 角度の更新
        rad_v += (-g * Math.sin(rad) / len) * dt;
        rad += rad_v * dt;

        draw_line(
            frictionless_pivot_x + len * Math.sin(rad),
            frictionless_pivot_y + len * Math.cos(rad),
            "#3F7A63");

        //  θ で計算
        rad_v_theta += (-g * rad_theta / len) * dt;
        rad_theta += rad_v_theta * dt;
        draw_line(
            frictionless_pivot_x + len * Math.sin(rad_theta),
            frictionless_pivot_y + len * Math.cos(rad_theta),
            "#FFFFFF");
    };

    setInterval(draw, 0.01);
};
