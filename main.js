const regionData = [
    {
        region: "Region Nord: Niedersachsen, Bremen, Schleswig-Holstein, Hamburg und Mecklenburg-Vorpommern",
        id: "nord",
        cities: [
            {city: "Belm", hoursPerMonth: 143},
            // {city: "Braunlage", hoursPerMonth: 184},
            {city: "Braunschweig", hoursPerMonth: 160},
            {city: "Cuxhaven", hoursPerMonth: 149},
            {city: "Diepholz", hoursPerMonth: 152},
            {city: "Emden", hoursPerMonth: 143},
            {city: "Friesoythe-Altenoythe", hoursPerMonth: 144},
            {city: "Göttingen", hoursPerMonth: 150},
            {city: "Hannover-Flughafen", hoursPerMonth: 150},
            // {city: "Lingen-Baccum", hoursPerMonth: 184},
            {city: "Lüchow", hoursPerMonth: 154},
            {city: "Norderney", hoursPerMonth: 162},
            {city: "Soltau", hoursPerMonth: 145},
            {city: "Bremen", hoursPerMonth: 159},
            {city: "Bremerhaven", hoursPerMonth: 149},
            // {city: "Fehmarn", hoursPerMonth: 195},
            {city: "Helgoland", hoursPerMonth: 156},
            // {city: "Kiel-Holtenau", hoursPerMonth: 184},
            {city: "List auf Sylt", hoursPerMonth: 143},
            // {city: "Lübeck-Blankensee", hoursPerMonth: 177},
            {city: "Sankt Peter-Ording", hoursPerMonth: 158},
            {city: "Schleswig", hoursPerMonth: 147},
            {city: "Hamburg-Fuhlsbüttel", hoursPerMonth: 153},
            // {city: "Arkona", hoursPerMonth: 178},
            {city: "Boizenburg", hoursPerMonth: 150},
            {city: "Boltenhagen", hoursPerMonth: 163},
            {city: "Greifswald", hoursPerMonth: 154},
            // {city: "Marnitz", hoursPerMonth: 184},
            // {city: "Rostock-Warnemünde", hoursPerMonth: 188},
            {city: "Schwerin", hoursPerMonth: 143},
            // {city: "Ueckermünde", hoursPerMonth: 185},
            {city: "Waren (Müritz)", hoursPerMonth: 158},
        ],
        avgSunHours: 184,
    }
];

const cellTypes = [
    {
        structure: "GaInP/GaAs//GaInAsP/GaInAs",
        efficiency: 0.46,
    },
    {
        structure: "GaInP/GaAs/GaInAs/GaInAs",
        efficiency: 0.457
    },
    {
        structure: "GaInP/GaAs/GaInAs",
        efficiency: 0.444
    },
    {
        structure: "GaInP/GaAs/GaInNAs",
        efficiency: 0.44
    },
    {
        structure: "GaInP/Ga(In)As/GaInAs",
        efficiency: 0.425
    },
    {
        structure: "GaInP-GaAs-wafer-GaInAs",
        efficiency: 0.423
    },
    {
        structure: "GaInP-Ga(In)As-Ge",
        efficiency: 0.416
    },
    {
        structure: "GaInP-GaInAs-Ge",
        efficiency: 0.411
    }
]

const regionSelect = document.getElementById("region-select");
for (let i = 0; i < regionData.length; i++) {
    regionSelect.innerHTML = regionSelect.innerHTML + `<option value = ${regionData[i].id}>${regionData[i].region}</option>`
}


regionSelect.addEventListener("change", () => {
    const region = regionSelect.value;
    const citySelect = document.getElementById("city-select");
    citySelect.innerHTML = "";
    for (let i = 0; i < regionData.length; i++) {
        if (regionData[i].id === region) {
            for (let j = 0; j < regionData[i].cities.length; j++) {
                citySelect.innerHTML = citySelect.innerHTML + `<option value = ${regionData[i].cities[j].city}>${regionData[i].cities[j].city}</option>`
            }
        }
    }
});

const citySelect = document.getElementById("city-select");
citySelect.addEventListener("change", () => {
    const city = citySelect.value;
    const hoursPerMonth = document.getElementById("sonnenstunden");
    
    for (let i = 0; i < regionData.length; i++) {
        for (let j = 0; j < regionData[i].cities.length; j++) {
            if (regionData[i].cities[j].city === city) {
                console.log(regionData[i].cities[j].hoursPerMonth)
                hoursPerMonth.innerHTML = regionData[i].cities[j].hoursPerMonth;
            }
        }
    }
});

const celltypeSelect = document.getElementById("celltype-select");
for (let i = 0; i < cellTypes.length; i++) {
    celltypeSelect.innerHTML = celltypeSelect.innerHTML + `<option value = ${cellTypes[i].structure}>${cellTypes[i].structure}</option>`
}

const calculate = document.getElementById("calculate");
calculate.addEventListener("click", () => {
    const efficiency = cellTypes.find(cell => cell.structure === celltypeSelect.value).efficiency;
    const area = document.getElementById("area").value;
    const hoursPerMonth = regionData.find(region => region.cities.find(city => city.city === citySelect.value)).cities.find(city => city.city === citySelect.value).hoursPerMonth;
    const angle = document.getElementById("angle").value;
    const latitude = document.getElementById("latitude").value;
    const usage = document.getElementById("usage").value;

    const regionResult = document.getElementById("region-result");
    const latitudeResult = document.getElementById("latitude-result");
    const angleResult = document.getElementById("angle-result");
    const usageResult = document.getElementById("usage-result");
    const areaResult = document.getElementById("area-result");
    const celltypeResult = document.getElementById("celltype-result");
    const productionResult = document.getElementById("production-result");
    const productionResultReal = document.getElementById("production-result-real");
    const ammortationIdeal = document.getElementById("ammortation-ideal");
    const ammortationReal = document.getElementById("ammortation-real");

    if (area === "" || angle === "" || latitude === "" || usage === "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    if (area < 0 || angle < 0 || latitude < -90 || latitude > 90 || usage < 0) {
        alert("Die Eingabewerte beinhalten ungültige Werte!");
        return;
    }
    if (isNaN(hoursPerMonth)) {
        alert("Die Sonnenstunden sind ungültig! Bitte wählen Sie eine andere Region aus!");
        return;
    }

    regionResult.innerHTML = citySelect.value;
    latitudeResult.innerHTML = latitude + "°";
    angleResult.innerHTML = angle + "°";
    usageResult.innerHTML = usage + " kWh";
    areaResult.innerHTML = area + "m²";
    celltypeResult.innerHTML = celltypeSelect.value;
    console.log(`1367 * ${area} * ${efficiency} * ${hoursPerMonth} * Math.sin(${angle} + ${latitude})`)
    const prodRes = Math.round(1367 * area * efficiency * hoursPerMonth * Math.sin((90 - Number(angle) + Number(latitude)) * Math.PI / 180) * 12 * 0.001);
    productionResult.innerHTML = prodRes.toString() + " kWh";
    productionResultReal.innerHTML = Math.round(prodRes / 4.5).toString() + " kWh";
    

    const summary = document.getElementById("summary");
    summary.innerHTML = `Die Solaranlage in ${citySelect.value} mit einer Fläche von ${area}m² und einer Neigung von ${angle}° und einer Ausrichtung von ${latitude}° produziert ${Math.round(1367 * area * efficiency * hoursPerMonth * Math.sin((90 - Number(angle) + Number(latitude)) * Math.PI / 180) * 12)} Wh pro Jahr.
    <br>
    Dabei ist zubeachten, dass die Solaranlage bei einer Fläche von ${area}m² aus ungefähr ${Math.round(area / 1.6)} Solarmodulen besteht. Außerdem ist die angegebene Effizienz der Solarmodule unter Laborbedingungen gemessen worden. Die tatsächliche Effizienz der Solarmodule kann daher abweichen, wodurch die
    Solaranlage vermutlich eher ca. ${Math.round(prodRes / 4.5)} kWh im Jahr liegt. Zusätzliche benötigte Peripherie, wie zum Beispiel ein Wechselrichter kostet bei verschiedenen Anbietern im Schnitt ca. 800€ - 2000€. 
    Die hier berechneten gesparten Stromkosten berücksichtigen keine Gebüren, die bei einem notwendigen, gegebenenfalls cloudbasierten Stromanbieterwechsel anfallen werden und sind dementsprechend als Reingewinn zu verstehen.`
    
    
    const costInput = document.getElementById("cost");
    const cost = costInput.value;
    const costResult = document.getElementById("cost-result");
    const costResultReal = document.getElementById("cost-result-real");
    costResult.innerHTML = `${Math.round(Number(prodRes) * Number(cost)) / 100}€`;
    costResultReal.innerHTML = `${Math.round(Number(prodRes / 4) * Number(cost)) / 100}€`;


    const costModuleAmount = document.getElementById("cost-module-amount");
    const costModulePrice = document.getElementById("cost-module-price");
    const costModuleResult = document.getElementById("cost-module-result");

    const costInverterAmount = document.getElementById("cost-inverter-amount");
    const costInverterPrice = document.getElementById("cost-inverter-price");
    const costInverterResult = document.getElementById("cost-inverter-result");

    const costMountingAmount = document.getElementById("cost-mounting-amount");
    const costMountingPrice = document.getElementById("cost-mounting-price");
    const costMountingResult = document.getElementById("cost-mounting-result");

    const costStorageAmount = document.getElementById("cost-storage-amount");
    const costStoragePrice = document.getElementById("cost-storage-price");
    const costStorageResult = document.getElementById("cost-storage-result");

    const costTotalResult = document.getElementById("cost-total-result");

    if (costModuleAmount.value != "" && costModulePrice.value != "") {
        costModuleResult.innerHTML = `${Number(costModuleAmount.value) * Number(costModulePrice.value)}€`;
    }
    if (costInverterAmount.value != "" && costInverterPrice.value != "") {
        costInverterResult.innerHTML = `${Number(costInverterAmount.value) * Number(costInverterPrice.value)}€`;
    }
    if (costMountingAmount.value != "" && costMountingPrice.value != "") {
        costMountingResult.innerHTML = `${Number(costMountingAmount.value) * Number(costMountingPrice.value)}€`;
    }
    if (costStorageAmount.value != "" && costStoragePrice.value != "") {
        costStorageResult.innerHTML = `${Number(costStorageAmount.value) * Number(costStoragePrice.value)}€`;
    }

    costTotalResult.innerHTML = `${Number(costModuleResult.innerHTML.replace("€", "")) + Number(costInverterResult.innerHTML.replace("€", "")) + Number(costMountingResult.innerHTML.replace("€", "")) + Number(costStorageResult.innerHTML.replace("€", ""))}€`;

    if (!parseFloat(costTotalResult.innerHTML) == 0 && !isNaN(parseFloat(costTotalResult.innerHTML))) {
        ammortationIdeal.innerHTML = `${Math.ceil(parseFloat(costTotalResult.innerHTML.replace("€", "")) / ((prodRes * cost) / 100))} Jahre`;
        ammortationReal.innerHTML = `${Math.ceil(parseFloat(costTotalResult.innerHTML.replace("€", "")) / ((prodRes / 4) * (cost / 100)))} Jahre`;
    }
});

// solarkonstante * fläche * wirkungsgrad * sonnenstunden * sin(neigungswinkel + dachneigung)