import React, { FC, useEffect } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { KangarooProps } from './interface';
import { gsap } from 'gsap';
import { classSelector, idSelector } from '../../../utils/gsap';
import { throttle } from 'lodash';

const earTimeline = gsap.timeline({ repeat: -1, yoyo: true });
export const waveEar = throttle(() => {
    earTimeline.pause();
    gsap.to(idSelector('ear_group'), {
        rotate: -25,
        transformOrigin: 'left center',
        duration: 0.1,
    });
    gsap.to(idSelector('ear_group'), {
        rotate: 0,
        transformOrigin: 'left center',
        delay: 0.1,
        duration: 0.1,
    });
    gsap.to(idSelector('ear_group-2'), {
        rotate: 25,
        transformOrigin: 'right center',
        duration: 0.1,
    });
    gsap.to(idSelector('ear_group-2'), {
        rotate: 0,
        transformOrigin: 'right center',
        duration: 0.1,
        delay: 0.1,
        onComplete: () => {
            earTimeline.restart();
        },
    });
}, 200);

const Giraffe: FC<KangarooProps> = ({ className, children }) => {
    useEffect(() => {
        earTimeline.add('begin');
        earTimeline.to(
            idSelector('ear_group'),
            {
                rotate: -10,
                transformOrigin: 'left center',
                duration: 1,
            },
            'begin'
        );
        earTimeline.to(
            idSelector('ear_group-2'),
            {
                rotate: 10,
                transformOrigin: 'right center',
                duration: 1,
            },
            'begin'
        );
    }, []);
    useEffect(() => {
        const eyeInner1 = document.getElementById('inner');
        const eyeInner2 = document.getElementById('inner-2');
        const eyeOuter = document.getElementById('outer');
        if (!eyeInner1 || !eyeInner2 || !eyeOuter) return;
        // eslint-disable-next-line prefer-const
        let { x: x1, y } = eyeInner1.getBoundingClientRect();
        const { x: x2 } = eyeInner2.getBoundingClientRect();
        let [eyeX, eyeY] = [(x1 + x2) / 2, y];
        const [screenWidth, screenHeight] = [
            window.innerWidth,
            window.innerHeight,
        ];
        let transBase = eyeOuter.getBoundingClientRect().width / 2;

        const handleResize = () => {
            transBase = eyeOuter.getBoundingClientRect().width / 2;
        };

        window.addEventListener('resize', handleResize);

        const handleMousemove = ({ x, y }: MouseEvent) => {
            let [transX, transY] = [
                (((x - eyeX) * 3) / screenWidth) * transBase,
                (((y - eyeY) * 3) / screenHeight) * transBase,
            ];
            if (transX > transBase) transX = transBase;
            if (transY > transBase) transY = transBase;
            // 眼珠
            gsap.to(idSelector('inner'), {
                x: transX,
                y: transY < -30 ? -30 : transY,
            });
            gsap.to(idSelector('inner-2'), {
                x: transX,
                y: transY < -30 ? -30 : transY,
            });
            // 眼圈
            gsap.to(idSelector('eye_group'), {
                x: transX / 6,
                y: transY / 6,
            });
            gsap.to(idSelector('eye_group-2'), {
                x: transX / 6,
                y: transY / 6,
            });
            // 嘴唇
            gsap.to(classSelector('downlip'), {
                x: transX / 3,
                y: transY / 3 - 10,
            });
            // 脑袋
            gsap.to(idSelector('head'), {
                x: transX / 2,
                y: transY / 2,
            });
        };

        window.addEventListener('mousemove', handleMousemove);

        // 更新眼珠基准坐标
        const resizeObserver = new ResizeObserver(() => {
            x1 = eyeInner1.getBoundingClientRect().x;
            eyeY = eyeInner1.getBoundingClientRect().y;
            eyeX = (x1 + x2) / 2;
        });
        const neckEle = document.getElementById('neck');
        neckEle && resizeObserver.observe(neckEle);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMousemove);
            neckEle && resizeObserver.unobserve(neckEle);
        };
    }, []);
    return (
        <div className={classnames(style.giraffe, className)} onClick={waveEar}>
            <svg id="head" viewBox="0 0 653.55 575.33">
                <title>giraffe</title>
                <path
                    id="corn"
                    d="M444.15,63c11,10-1,23-5,31-15,30,5,82,5,82l-50-4s26-61,19-80c-5.38-14.6-17.52-24.48-10-32C411.15,52,433.15,53,444.15,63Z"
                    transform="translate(-22.8 -52.67)"
                    fill="#f7931e"
                    stroke="#f15a24"
                    strokeMiterlimit="10"
                    strokeWidth="4"
                />
                <path
                    id="corn-2"
                    data-name="corn"
                    d="M255,63c-11,10,1,23,5,31,15,30-5,82-5,82l50-4s-26-61-19-80c5.38-14.6,17.52-24.48,10-32C288,52,266,53,255,63Z"
                    transform="translate(-22.8 -52.67)"
                    fill="#f7931e"
                    stroke="#f15a24"
                    strokeMiterlimit="10"
                    strokeWidth="4"
                />
                <g id="tooth_group">
                    <path
                        id="teeth"
                        d="M431.15,548s0,40-4,41-21,0-26,0,0-41,0-41Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                    <path
                        id="teeth-2"
                        data-name="teeth"
                        d="M409.15,548.5s0,40-4,41-21,0-26,0,0-41,0-41Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                    <path
                        id="teeth-3"
                        data-name="teeth"
                        d="M385.15,548.5s0,40-4,41-21,0-26,0,0-41,0-41Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                </g>
                <g id="tooth_group-2" data-name="tooth_group">
                    <path
                        id="teeth-4"
                        data-name="teeth"
                        d="M268,548s0,40,4,41,21,0,26,0,0-41,0-41Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                    <path
                        id="teeth-5"
                        data-name="teeth"
                        d="M290,548.5s0,40,4,41,21,0,26,0,0-41,0-41Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                    <path
                        id="teeth-6"
                        data-name="teeth"
                        d="M314,548.5s0,40,4,41,21,0,26,0,0-41,0-41Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                </g>
                <g id="ear_group">
                    <path
                        id="ear_background"
                        d="M666.31,156.5s-23.77,12.65-35.81,13-93.73-6-103.88-5c-26.19,2.49-24.39,14-43.09,17.54-8.1,1.54-15,.14-23.36,5.66-7.17,4.76-8.72,29.55-2.08,35.94s18.85,3.1,24,1.39,18.26-3.95,26.07-.5,19.33,12.14,29.32,12.72,41.16-1.63,54.54-7.87,42.13-35.63,49.52-42.21S666.31,156.5,666.31,156.5Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fbb03b"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <path
                        id="ear_shadow"
                        d="M457.09,221.59c6.64,6.4,18.85,3.1,24,1.39s18.26-3.95,26.07-.5,19.33,12.14,29.32,12.72,41.16-1.63,54.54-7.87c6.43-3,33.74-28,43.19-36.57,0,0-65.94,14.22-108.86,11.74C473.91,199.53,457.09,221.59,457.09,221.59Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                    <path
                        d="M582.77,169.86a18,18,0,0,0,35.92,2.32"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                    <path
                        d="M527.45,167.38a11.64,11.64,0,0,0-4.3,9.12,11,11,0,1,0,22,0,11.69,11.69,0,0,0-4-8.91"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                </g>
                <g id="ear_group-2" data-name="ear_group">
                    <path
                        id="ear_background-2"
                        data-name="ear_background"
                        d="M32.84,156.5s23.77,12.65,35.8,13,93.74-6,103.89-5c26.19,2.49,24.39,14,43.08,17.54,8.11,1.54,15,.14,23.37,5.66,7.17,4.76,8.72,29.55,2.08,35.94s-18.86,3.1-24,1.39-18.26-3.95-26.07-.5-19.34,12.14-29.32,12.72-41.16-1.63-54.54-7.87S65,193.7,57.65,187.12,32.84,156.5,32.84,156.5Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#fbb03b"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <path
                        id="ear_shadow-2"
                        data-name="ear_shadow"
                        d="M242.06,221.59c-6.64,6.4-18.86,3.1-24,1.39s-18.26-3.95-26.07-.5-19.34,12.14-29.32,12.72-41.16-1.63-54.54-7.87c-6.43-3-33.75-28-43.19-36.57,0,0,65.93,14.22,108.86,11.74C225.23,199.53,242.06,221.59,242.06,221.59Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                    <path
                        d="M116.38,169.86a18,18,0,1,1-35.92,2.32"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                    <path
                        d="M171.7,167.38a11.67,11.67,0,0,1,4.3,9.12,11,11,0,1,1-22,0,11.72,11.72,0,0,1,4-8.91"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                </g>
                <g id="face">
                    <path
                        id="background"
                        d="M349.58,567.5c78,0,100.24-8.54,102.43-19.5,3-15-6-15-10-38s3-47.51,11-86c5-24,15.87-190,16-195s-5.86-55-17.86-62c-18.33-10.69-101.57-11-101.57-11"
                        transform="translate(-22.8 -52.67)"
                        fill="#fbb03b"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <g id="pattern_group">
                        <circle cx="343.35" cy="210.33" r="10" fill="#f7931e" />
                        <circle
                            cx="391.85"
                            cy="361.83"
                            r="22.5"
                            fill="#f7931e"
                        />
                        <path
                            d="M370.33,159.33a13,13,0,0,0-.18,2.17,12.5,12.5,0,0,0,24.93,1.3c0-.14,0-.28,0-.42s0-.59,0-.88a11.46,11.46,0,0,0-.06-1.17"
                            transform="translate(-22.8 -52.67)"
                            fill="#f7931e"
                        />
                        <path
                            d="M442,522.07c-2.93,3.24-4.85,8.72-4.85,14.93,0,7.34,2.68,13.65,6.53,16.45,0,0,8.24-.58,5.47-14.45C448.15,534,442,522.07,442,522.07Z"
                            transform="translate(-22.8 -52.67)"
                            fill="#f7931e"
                        />
                    </g>
                </g>
                <g id="face-2" data-name="face">
                    <path
                        id="background-3"
                        data-name="background"
                        d="M349.56,567.5c-78,0-100.23-8.54-102.43-19.5-3-15,6-15,10-38s-3-47.51-11-86c-5-24-15.86-190-16-195S236,174,248,167c18.32-10.69,101.56-11,101.56-11"
                        transform="translate(-22.8 -52.67)"
                        fill="#fbb03b"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <g id="pattern_group-2" data-name="pattern_group">
                        <circle cx="310.2" cy="210.33" r="10" fill="#f7931e" />
                        <circle
                            cx="261.7"
                            cy="361.83"
                            r="22.5"
                            fill="#f7931e"
                        />
                        <path
                            d="M328.81,159.33a12,12,0,0,1,.19,2.17,12.5,12.5,0,0,1-24.93,1.3c0-.14,0-.28,0-.42s0-.59,0-.88,0-.78.05-1.17"
                            transform="translate(-22.8 -52.67)"
                            fill="#f7931e"
                        />
                        <path
                            d="M257.15,522.07c2.93,3.24,4.85,8.72,4.85,14.93,0,7.34-2.68,13.65-6.53,16.45,0,0-8.24-.58-5.47-14.45C251,534,257.15,522.07,257.15,522.07Z"
                            transform="translate(-22.8 -52.67)"
                            fill="#f7931e"
                        />
                    </g>
                </g>
                <g id="eye_group">
                    <circle
                        id="outer"
                        cx="416.6"
                        cy="244.58"
                        r="60.5"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <circle
                        id="inner"
                        cx="416.6"
                        cy="244.58"
                        r="12"
                        fill="#f15a24"
                    />
                    <path
                        id="eyebrows"
                        d="M487.79,231.14a125.91,125.91,0,0,1-9,10.27c-2.92,2.89-5.66,4.37-6,4.14a57,57,0,0,0-34.24-10.89c-19.66.28-36.95,10.65-47.61,26.42-7.24,10.7,104.41,11.91,98.25,2.06-.13-.21,1.38-.73,5.33-5,6.29-6.85,9.76-19.3,9.76-19.3s-6.91,8.92-12.59,12.58c-4.58,2.94-7,4.19-8.31,3.88a62.18,62.18,0,0,0-5.25-5.39s3.45-4,4.35-5.13C485,241.54,487.79,231.14,487.79,231.14Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#f15a24"
                    />
                </g>
                <g id="eye_group-2" data-name="eye_group">
                    <circle
                        id="outer-2"
                        data-name="outer"
                        cx="236.95"
                        cy="244.58"
                        r="60.5"
                        fill="#fff"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <circle
                        id="inner-2"
                        data-name="inner"
                        cx="236.95"
                        cy="244.58"
                        r="12"
                        fill="#f15a24"
                    />
                    <path
                        id="eyebrows-2"
                        data-name="eyebrows"
                        d="M211.35,231.14a127,127,0,0,0,9,10.27c2.92,2.89,5.66,4.37,6,4.14a57,57,0,0,1,34.24-10.89c19.65.28,36.95,10.65,47.61,26.42,7.23,10.7-104.41,11.91-98.25,2.06.13-.21-1.38-.73-5.34-5-6.28-6.85-9.75-19.3-9.75-19.3s6.91,8.92,12.59,12.58c4.58,2.94,7,4.19,8.31,3.88a60.76,60.76,0,0,1,5.25-5.39s-3.45-4-4.35-5.13C214.12,241.54,211.35,231.14,211.35,231.14Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#f15a24"
                    />
                </g>
                <path
                    id="nose"
                    d="M388.15,504s10-32-6-28-16,32-16,32"
                    transform="translate(-22.8 -52.67)"
                    fill="#f15a24"
                />
                <path
                    id="nose-2"
                    data-name="nose"
                    d="M311,504s-10-32,6-28,16,32,16,32"
                    transform="translate(-22.8 -52.67)"
                    fill="#f15a24"
                />
                <g id="downlip" className="downlip">
                    <path
                        id="background-2"
                        data-name="background"
                        d="M349.58,625.5h12.07s47.91-.17,69-4c22-4,30.32-11,28-25-2-12-10-12-17-8-5.2,3-79,2-79,2H349.58"
                        transform="translate(-22.8 -52.67)"
                        fill="#fbb03b"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                    <path
                        d="M410.12,621.25c-.5-6.28-7.24-11.25-15.47-11.25-8.56,0-15.5,5.37-15.5,12q0,.36,0,.72s12,.28,25-.72C409.13,621.62,410.12,621.25,410.12,621.25Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                </g>
                <g id="downlip-2" data-name="downlip" className="downlip">
                    <path
                        id="background-4"
                        data-name="background"
                        d="M349.56,625.5H337.5s-47.91-.17-69-4c-22-4-30.32-11-28-25,2-12,10-12,17-8,5.2,3,79,2,79,2h13.06"
                        transform="translate(-22.8 -52.67)"
                        fill="#fbb03b"
                        stroke="#f15a24"
                        strokeMiterlimit="10"
                        strokeWidth="5"
                    />
                    <path
                        d="M289,621.25c.5-6.28,7.24-11.25,15.47-11.25,8.56,0,15.5,5.37,15.5,12q0,.36,0,.72s-12,.28-25-.72C290,621.62,289,621.25,289,621.25Z"
                        transform="translate(-22.8 -52.67)"
                        fill="#f7931e"
                    />
                </g>
            </svg>
            <div id="neck" className={classnames(style.neck)}>
                <div className={classnames(style.neckContent)}>{children}</div>
            </div>
        </div>
    );
};

export default Giraffe;
