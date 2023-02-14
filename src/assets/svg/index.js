import IconComponent from "views/pages/components/SvgIcon";

export const BinSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <line x1="1" y1="3.5" x2="13" y2="3.5" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></line>
    <path d="M2.5,3.5h9a0,0,0,0,1,0,0v9a1,1,0,0,1-1,1h-7a1,1,0,0,1-1-1v-9A0,0,0,0,1,2.5,3.5Z" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
    <path d="M4.5,3.5V3a2.5,2.5,0,0,1,5,0v.5" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
  </g></g></svg>`}
	/>
);
export const ViewSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 20 20">
	  
	<g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
		<path d="M13.23,6.33a1,1,0,0,1,0,1.34C12.18,8.8,9.79,11,7,11S1.82,8.8.77,7.67a1,1,0,0,1,0-1.34C1.82,5.2,4.21,3,7,3S12.18,5.2,13.23,6.33Z" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
		<circle cx="7" cy="7" r="2" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></circle>
	  </g></g></svg>`}
	/>
);
export const EditSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 20 20">
	  
	<g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
		<line x1="0.5" y1="13.5" x2="11.5" y2="13.5" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></line>
		<path d="M6.5,10l-3,.54L4,7.5,10.73.79a1,1,0,0,1,1.42,0l1.06,1.06a1,1,0,0,1,0,1.42Z" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
	  </g></g></svg>`}
	/>
);
export const AddSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <circle cx="7" cy="7" r="6.5" style="fill: none;stroke: #000;stroke-linecap: round;stroke-linejoin: round"></circle>
    <g>
      <line x1="7" y1="4" x2="7" y2="10" style="fill: none;stroke: #000;stroke-linecap: round;stroke-linejoin: round"></line>
      <line x1="4" y1="7" x2="10" y2="7" style="fill: none;stroke: #000;stroke-linecap: round;stroke-linejoin: round"></line>
    </g>
  </g></g></svg>`}
	/>
);
export const AddWorkPendingSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <path d="M1.5,2.5a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1h11a1,1,0,0,0,1-1v-9a1,1,0,0,0-1-1h-2" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
    <line x1="3.5" y1="0.5" x2="3.5" y2="4.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="10.5" y1="0.5" x2="10.5" y2="4.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="3.5" y1="2.5" x2="8.5" y2="2.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="9.5" y1="8" x2="4.5" y2="8" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="7" y1="5.5" x2="7" y2="10.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
  </g></g></svg>`}
	/>
);

export const AddWorkDone = ({ color = "#00BBF1" }) => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <path d="M1.5,2.5a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1h11a1,1,0,0,0,1-1v-9a1,1,0,0,0-1-1h-2" style="fill: none;stroke:${color};stroke-linecap: round;stroke-linejoin: round"></path>
    <line x1="3.5" y1="0.5" x2="3.5" y2="4.5" style="fill: none;stroke:${color};stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="10.5" y1="0.5" x2="10.5" y2="4.5" style="fill: none;stroke:${color};stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="3.5" y1="2.5" x2="8.5" y2="2.5" style="fill: none;stroke:${color};stroke-linecap: round;stroke-linejoin: round"></line>
    <polyline points="4 9 6 10.5 9.5 6.5" style="fill: none;stroke:${color};stroke-linecap: round;stroke-linejoin: round"></polyline>
  </g></g></svg>`}
	/>
);
export const ClockSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <circle cx="7" cy="7" r="6.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></circle>
    <polyline points="7 4.5 7 7 9.54 9.96" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></polyline>
  </g></g></svg>`}
	/>
);

export const DeleteSVG = () => (
	<IconComponent
		svg={`
			<svg style="width:20px" viewBox="0 0 20 20">
			<g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
			<line x1="1" y1="3.5" x2="13" y2="3.5" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></line>
			<path d="M2.5,3.5h9a0,0,0,0,1,0,0v9a1,1,0,0,1-1,1h-7a1,1,0,0,1-1-1v-9A0,0,0,0,1,2.5,3.5Z" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
			<path d="M4.5,3.5V3a2.5,2.5,0,0,1,5,0v.5" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
			</g></g></svg>
			`}
	/>
);

export const KeySVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 20 20">
  
		<g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
				<polyline points="5.62 7.38 11.5 1.5 13.5 3.5" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></polyline>
				<line x1="9.25" y1="3.75" x2="11" y2="5.5" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></line>
				<circle cx="3.5" cy="9.5" r="3" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></circle>
			</g></g></svg>
		`}
	/>
);

export const PaperSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <path d="M13.5,4.5V11a1.25,1.25,0,0,1-1.25,1.25h0A1.25,1.25,0,0,1,11,11h0V2.25a.5.5,0,0,0-.5-.5H1a.5.5,0,0,0-.5.5v9a1,1,0,0,0,1,1H12.25" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
    <rect x="3.5" y="4.25" width="4.5" height="2.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></rect>
    <line x1="3.5" y1="9.75" x2="8" y2="9.75" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
  </g></g></svg>`}
	/>
);

export const UserProfileSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <circle cx="7" cy="5.5" r="2.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></circle>
    <path d="M10.31,10.75a5,5,0,0,0-6.62,0" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
    <path d="M13.5,10.5v2a1,1,0,0,1-1,1h-2" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
    <path d="M10.5.5h2a1,1,0,0,1,1,1v2" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
    <path d="M.5,3.5v-2a1,1,0,0,1,1-1h2" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
    <path d="M3.5,13.5h-2a1,1,0,0,1-1-1v-2" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
  </g></g></svg>`}
	/>
);

export const ArrowDownSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><path d="M.5,3.85,6.65,10a.48.48,0,0,0,.7,0L13.5,3.85" style="fill: none;stroke: #000;stroke-linecap: round;stroke-linejoin: round"></path></g></svg>`}
	/>
);

export const Edit2SVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
		<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)">
			<g>
				<path
					d="M7.5,9l-3,.54L5,6.5,10.73.79a1,1,0,0,1,1.42,0l1.06,1.06a1,1,0,0,1,0,1.42Z"
					style="fill: none;stroke: #000;stroke-linecap: round;stroke-linejoin: round"
				></path>
				<path
					d="M12,9.5v3a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1V3a1,1,0,0,1,1-1h3"
					style="fill: none;stroke: #000;stroke-linecap: round;stroke-linejoin: round"
				></path>
			</g>
		</g>
	</svg>`}
	/>
);
export const ValidateCheckSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <rect x="0.5" y="0.5" width="13" height="13" rx="3" style="fill: none;stroke: #00BBF1;stroke-linecap: round;stroke-linejoin: round"></rect>
    <path d="M4,8,6.05,9.64a.48.48,0,0,0,.4.1.5.5,0,0,0,.34-.24L10,4" style="fill: none;stroke: #00BBF1;stroke-linecap: round;stroke-linejoin: round"></path>
  </g></g></svg>`}
	/>
);

export const DeleteCircleSVG = () => (
	<IconComponent
		svg={`<svg style='width:20px' viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <g>
      <line x1="9.12" y1="4.88" x2="4.88" y2="9.12" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></line>
      <line x1="4.88" y1="4.88" x2="9.12" y2="9.12" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></line>
    </g>
    <circle cx="7" cy="7" r="6.5" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></circle>
  </g></g></svg>`}
	/>
);
export const SendMailSVG = () => (
	<IconComponent
		svg={`<svg style="width:50px" viewBox="0 0 50 50"><g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><path d="M5.818,10.992,8,13.171a1.124,1.124,0,0,0,1.861-.439L13.442,1.979A1.123,1.123,0,0,0,12.021.558L1.268,4.142A1.124,1.124,0,0,0,.829,6L3.57,8.744l-.093,3.465Z" fill="none" stroke="#0B29D8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.121 0.782L3.57 8.744" fill="none" stroke="#0B29D8" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`}
	/>
);
export const FileClipboardBlockSVG = (color = "#D63A3A") => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <path d="M5.5,13.5h-4a1,1,0,0,1-1-1V2.5a1,1,0,0,1,1-1H3" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></path>
    <path d="M8,1.5H9.5a1,1,0,0,1,1,1v2" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></path>
    <rect x="3" y="0.5" width="5" height="2.5" rx="1" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></rect>
    <circle cx="10.25" cy="10.25" r="3.25" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></circle>
    <line x1="7.95" y1="12.55" x2="12.55" y2="7.95" style="fill: none;stroke: #D63A3A;stroke-linecap: round;stroke-linejoin: round"></line>
  </g></g></svg>`}
	/>
);
export const FileClipboardCheckSVG = (color = "#0D6EFF") => (
	<IconComponent
		svg={`<svg style='width:20px' viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <path d="M9.5,1.5H11a1,1,0,0,1,1,1v10a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V2.5a1,1,0,0,1,1-1H4.5" style="fill: none;stroke: #0D6EFF;stroke-linecap: round;stroke-linejoin: round"></path>
    <rect x="4.5" y="0.5" width="5" height="2.5" rx="1" style="fill: none;stroke: #0D6EFF;stroke-linecap: round;stroke-linejoin: round"></rect>
    <polyline points="4.5 8.5 6.5 10 9 6" style="fill: none;stroke: #0D6EFF;stroke-linecap: round;stroke-linejoin: round"></polyline>
  </g></g></svg>`}
	/>
);
export const FileClipboardTextSVG = ({ color = "#0D6EFF" }) => {
	return (
		<IconComponent
			svg={`<svg style="width:20px" viewBox="0 0 50 50">
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <path d="M9.5,1.5H11a1,1,0,0,1,1,1v10a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V2.5a1,1,0,0,1,1-1H4.5" style="fill: none;stroke:${color};stroke-linecap: round;stroke-linejoin: round"></path>
    <rect x="4.5" y="0.5" width="5" height="2.5" rx="1" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></rect>
    <line x1="4.5" y1="5.5" x2="9.5" y2="5.5" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="4.5" y1="8" x2="9.5" y2="8" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="4.5" y1="10.5" x2="9.5" y2="10.5" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></line>
  </g></g></svg>`}
		/>
	);
};
export const LogoutCircle = () => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 50 50">
  
<g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><g>
    <line x1="6.5" y1="7" x2="13.5" y2="7" style="fill: none;stroke: #00BBF1;stroke-linecap: round;stroke-linejoin: round"></line>
    <polyline points="11.5 5 13.5 7 11.5 9" style="fill: none;stroke: #00BBF1;stroke-linecap: round;stroke-linejoin: round"></polyline>
    <path d="M11.7,11.49a6.5,6.5,0,1,1,0-9" style="fill: none;stroke: #00BBF1;stroke-linecap: round;stroke-linejoin: round"></path>
  </g></g></svg>`}
	/>
);
export const UploadSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  
    <g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"><g>
        <path d="M1.91,9.5.61,12.05a1,1,0,0,0,0,1,1,1,0,0,0,.87.47h11a1,1,0,0,0,.87-.47,1,1,0,0,0,0-1L12.09,9.5Z" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></path>
        <polyline points="5 2.5 7 0.5 9 2.5" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></polyline>
        <line x1="7" y1="0.5" x2="7" y2="6.5" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></line>
        <path d="M3,4.5a1,1,0,0,0-1,1v4H12v-4a1,1,0,0,0-1-1" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></path>
      </g></g></svg>`}
	/>
);

export const FilterSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  
  <g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"><path d="M13.5.5H.5a6.51,6.51,0,0,0,5,6.33V13.5l3-2V6.83A6.51,6.51,0,0,0,13.5.5Z" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></path></g></svg>`}
	/>
);

export const WaitSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  
    <g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"><g>
        <path d="M10.5,3.5a3.5,3.5,0,0,1-7,0V.5h7Z" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
        <path d="M10.5,10.5a3.5,3.5,0,0,0-7,0v3h7Z" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
        <line x1="1.5" y1="0.5" x2="12.5" y2="0.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
        <line x1="1.5" y1="13.5" x2="12.5" y2="13.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
      </g></g></svg>`}
	/>
);

export const DeniedSVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  
    <g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"><g>
        <g>
          <line x1="9.12" y1="4.88" x2="4.88" y2="9.12" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
          <line x1="4.88" y1="4.88" x2="9.12" y2="9.12" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
        </g>
        <rect x="0.5" y="0.5" width="13" height="13" rx="3" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></rect>
      </g></g></svg>`}
	/>
);

export const DoneSVG = ({ color = "#FC6430" }) => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 48 48">
  
<g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"><g>
    <rect x="0.5" y="0.5" width="13" height="13" rx="3" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></rect>
    <path d="M4,8,6.05,9.64a.48.48,0,0,0,.4.1.5.5,0,0,0,.34-.24L10,4" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></path>
  </g></g></svg>`}
	/>
);
export const DownloadSVG = () => (
	<IconComponent
		svg={`<svg style="width:15px"  viewBox="0 0 48 48">
  
    <g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"><g>
        <polyline points="4 7 7 10.5 10 7" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></polyline>
        <line x1="7" y1="10.5" x2="7" y2="3.5" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></line>
        <circle cx="7" cy="7" r="6.5" style="fill: none;stroke: #000000;stroke-linecap: round;stroke-linejoin: round"></circle>
      </g></g></svg>`}
	/>
);
export const ExpandSVG = ({ color = "#fff" }) => (
	<IconComponent
		svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  
<g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"><g>
    <rect x="3.5" y="0.5" width="10" height="10" rx="1" transform="translate(17 11) rotate(180)" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></rect>
    <path d="M10.5,13.5h-9a1,1,0,0,1-1-1v-9" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></path>
    <polyline points="7.5 3.5 10.5 3.5 10.5 6.5" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></polyline>
    <line x1="10.5" y1="3.5" x2="6.5" y2="7.5" style="fill: none;stroke: ${color};stroke-linecap: round;stroke-linejoin: round"></line>
  </g></g></svg>`}
	/>
);

export const CopySVG = () => (
	<IconComponent
		svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  
		<g transform="matrix(42.857142857142854,0,0,42.857142857142854,0,0)"><g>
				<rect x="0.5" y="0.5" width="10.5" height="10.5" rx="1" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></rect>
				<path d="M13.5,3.5v9a1,1,0,0,1-1,1h-9" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
			</g></g></svg>`}
	/>
);

export const ArrowsRightSVG = ({ color = "#fff" }) => (
	<IconComponent
		svg={`<svg style="width:20px" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(42.857142857142854,0,0,42.857142857142854,0,0)"><path d="M.5,12.5C3.423,10.027,4.142,9,7,9H8.5v3l5-5.5-5-5v3h-1C2.5,4.5,1.5,9.5.5,12.5Z" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`}
	/>
);
