const latestReleaseEndpoint = "https://api.github.com/repos/Martichou/rquickshare/releases/latest";

const dropdownContentLinuxMain = document.querySelector("#dropdown-content-linux-main");
const dropdownContentLinuxLegacy = document.querySelector("#dropdown-content-linux-legacy");
const dropdownContentMacos = document.querySelector("#dropdown-content-macos");

async function updateDownloadOptions() {
	const response = await fetch(latestReleaseEndpoint);

	if (!response.ok) {
		const assetAnchor = `<a href="https://github.com/Martichou/rquickshare/releases/latest">Donwload from Github Releases  <img src="assets/icons/download.svg" alt="Download icon"></a>`;

		dropdownContentLinuxMain.innerHTML += assetAnchor;
		dropdownContentLinuxLegacy.innerHTML += assetAnchor;
		dropdownContentMacos.innerHTML += assetAnchor;

		return;
	}

	const data = await response.json();

	data.assets.forEach((asset) => {
		const assetAnchor = `<a href="${asset.browser_download_url}">${asset.name} <img src="assets/icons/download.svg" alt="Download icon"></a>`;
		const isLegacy = asset.name.startsWith("r-quick-share-legacy");
		const isDmg = asset.name.endsWith(".dmg");

		if (isLegacy) {
			dropdownContentLinuxLegacy.innerHTML += assetAnchor;
		}

		if (isDmg) {
			dropdownContentMacos.innerHTML += assetAnchor;
		}

		if (!isLegacy && !isDmg) {
			dropdownContentLinuxMain.innerHTML += assetAnchor;
		}
	});
}

updateDownloadOptions();
