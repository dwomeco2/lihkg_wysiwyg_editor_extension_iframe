import React, { useState } from 'react';
import styled from 'styled-components';
import BaseToolBar from './BaseToolbar';
import BaseToolbarBtn from './BaseToolbarButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullScreenIcon from '@material-ui/icons/Fullscreen';
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit';

const IframeWrapper = styled.div`
    width: 50vw;
    height: 60vh;
    min-width: min-content;
    min-height: min-content;
    z-index: 1001;
    background: none;
    position: fixed;
    top: calc((100vh - 60vh) / 2);
    left: calc((100vw - 50vw) / 2);

    & > div:first-child {
        opacity: 0.7;
        transition: opacity .3s;
    }

    & > div:first-child:hover {
        opacity: 1;
    }

    &.open_normal {
        top: calc((100vh - 60vh) / 2);
        left: calc((100vw - 50vw) / 2);
        width: 50vw;
        height: 60vh;
        opacity: 1;
        transition:
            top .5s cubic-bezier(.1, 1.2, .3, 1) .5s ,
            left .5s cubic-bezier(.1, 1.2, .3, 1) .5s ,
            width .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            height .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            opacity .3s;
    }

    &.open_expand {
        top: calc((100vh - 80vh) / 2);
        left: calc((100vw - 70vw) / 2);
        width: 70vw;
        height: 80vh;
        opacity: 1;
        transition:
            top .5s cubic-bezier(.1, 1.2, .3, 1) .5s ,
            left .5s cubic-bezier(.1, 1.2, .3, 1) .5s ,
            width .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            height .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            opacity .3s;
    }

    &.minimized {
        width: 150px;
        opacity: .5;
        top: 96%;
        left: 5%;
        transition:
            top .5s cubic-bezier(.1, 1.2, .3, 1) .5s ,
            left .5s cubic-bezier(.1, 1.2, .3, 1) .5s ,
            width .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            height .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            opacity .3s;

        &:hover {
            opacity: 1;
        }
    }

    &.normal_expand {
        top: calc((100vh - 80vh) / 2);
        left: calc((100vw - 70vw) / 2);
        width: 70vw;
        height: 80vh;
        transition:
            top .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            left .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            width .5s cubic-bezier(.1, 1, .3, 1) 0s ,
            height .5s cubic-bezier(.1, 1, .3, 1) 0s;
    }

    &.expand_normal {
        top: calc((100vh - 60vh) / 2);
        left: calc((100vw - 50vw) / 2);
        width: 50vw;
        height: 60vh;
        transition:
            top .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            left .5s cubic-bezier(.1, 1.2, .3, 1) 0s ,
            width .5s cubic-bezier(.1, 1, .3, 1) 0s ,
            height .5s cubic-bezier(.1, 1, .3, 1) 0s;
    }
`;

const ZoomableFuncToolBar = ({ isMin, isZoomOut, setMin, setIsZoomOut, setClassName }) => {

    const expandOnClick = () => {
        setMin(!isMin)

        if (!isMin && isZoomOut) {
            setIsZoomOut(!isZoomOut)
            setClassName('minimized')
            return
        }
        setClassName(isMin ? 'open_normal' : 'minimized')
    };

    const FullscreenOnClick = () => {
        setIsZoomOut(!isZoomOut)

        if (!isZoomOut && isMin) {
            setMin(!isMin)
            setClassName('open_expand')
            return
        }
        setClassName(isZoomOut ? 'expand_normal' : 'normal_expand')
    }

    return (
        <BaseToolBar style={{
            flexDirection: "row-reverse", 
            background: "#151515"
        }}>
            <BaseToolbarBtn
                onClick={expandOnClick}
            >
                {isMin ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </BaseToolbarBtn>
            <BaseToolbarBtn
                onClick={FullscreenOnClick}
            >
                {isZoomOut ? <FullScreenExitIcon /> : <FullScreenIcon />}
            </BaseToolbarBtn>
        </BaseToolBar>
    )
};

const useZoomableClassName = () => {
    const [isZoomOut, setIsZoomOut] = useState(false);
    const [isMin, setMin] = useState(true);
    const [className, setClassName] = useState('minimized');

    return [{className, isMin, isZoomOut}, {setIsZoomOut, setMin, setClassName}]
}

const IframeWrapperExtension = ({src}) => {
    const [states, { setIsZoomOut, setMin, setClassName }] = useZoomableClassName();

    return (
        <IframeWrapper
            className={states.className}
            onKeyDown={(e) => {
                //keydown blocker
                e.stopPropagation()
            }}
        >
            <ZoomableFuncToolBar 
                isMin={states.isMin} setMin={setMin}
                isZoomOut={states.isZoomOut} setIsZoomOut={setIsZoomOut} 
                setClassName={setClassName}
            />

            <div style={{ 
                position: "relative", 
                width: "100%", 
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}>
                <iframe
                    title={"LIHKG_WYSIWYG_EDITOR_IFRAME"}
                    src={src}
                    frameBorder={"0"}
                    scrolling={"no"}
                    style={{
                        display: "block",
                        border: "none",
                        minWidth: "100%",
                        minHeight: "100%",
                    }}
                    allowFullScreen
                />
            </div>
        </IframeWrapper>
    )
}

export default IframeWrapperExtension;