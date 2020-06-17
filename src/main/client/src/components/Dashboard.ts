import Yogurt from "../yogurt"
import App from "./App";

const state: DashboardState = {}

const template: Template<DashboardState> = (props) => `
	<div class="mt-6 w-full flex justify-center">
		<div id='add-album-section' class="rounded p-2 shadow-xl flex flex-col justify-start bg-blue-600"></div>
	</div>

	<div class="my-6 w-full flex flex-wrap justify-center" >
		<div class="w-full mb-2 text-lg font-bold text-blue-500 border-b border-blue-500">Albums</div>
		<div class="w-full text-sm mb-4 text-gray-800">Drag and drop an album to sort it differently.</div>
		<section id="album-grid" class="w-full album-grid"></section>
	</div>
`
const Dashboard = new Yogurt<DashboardState>({
	selector: '#dashboard-section',
	state,
	template,
	childOf: App
})

export default Dashboard;
