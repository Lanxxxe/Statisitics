const input = document.getElementById('data');
let inputted_Data = document.getElementById('data-container');
let Range_Button = document.getElementById('range');
let Inter_Quartile_Button = document.getElementById('IQR');
let Variance_Button = document.getElementById('Pop_Variance');
let Sample_Variance_Button = document.getElementById('Samp_Variance');
let Population_Standard_Deviation_Button = document.getElementById('PSD');
let Sample_Standard_Deviation_Button = document.getElementById('SSD');
let Coefficient_Variance_Button = document.getElementById('Coe_Variance');
let show_Result = document.getElementById('result');
let clear_Data = document.getElementById('clear');

const show_data = () => {
    let userInput = input.value;

    document.getElementById('data-container').textContent = userInput;
}

const get_input = (user_input) => {
    let get_value = user_input.value;
    const split_value = get_value.split(' ');
    const convert_to_Number = split_value.map(Number);

    return convert_to_Number
};

const get_mean = (mean_data) => {
    const data =  get_input(mean_data)
    const len_data = data.length;
    const total_number = data.reduce((counter, currentValue) => counter + currentValue, 0);
    const mean = total_number / len_data;
    return mean
}

const calculatePercentilePositions = (data) => {
    data.sort((a, b) => a - b);
    const q1Index = Math.floor(data.length / 4);
    const q2Index = Math.floor(data.length / 2);
    const q3Index = Math.floor(3 * data.length / 4);

    return {
        q1Position: q1Index,
        q2Position: q2Index,
        q3Position: q3Index
    };
};


Range_Button.addEventListener('click', () => {
    let array = get_input(input)
    // let arr_mean = get_mean(input);
    const maximum = Math.max(...array);
    const minimum = Math.min(...array);
    let range = maximum - minimum;
    show_Result.innerHTML = `Range = ${range}`;
})


Inter_Quartile_Button.addEventListener('click', () => {
    let iqr_data = get_input(input);
    let sorted_data = iqr_data.sort();
    let calculate_Position = calculatePercentilePositions(iqr_data);
    let iqr = sorted_data[calculate_Position.q3Position] - sorted_data[calculate_Position.q1Position];
    show_Result.innerHTML = `IQR = ${iqr}`;
    
});


Variance_Button.addEventListener('click', () => {
    let V_Population_computation_result = [];
    let V_Population_Mean = get_mean(input);
    let V_Population_Data = get_input(input);
    let V_Population_Sorted_Data = V_Population_Data.sort();
    
    for (let V_index = 0 ; V_index < V_Population_Sorted_Data.length ; V_index++){
        V_Population_computation_result.push((V_Population_Sorted_Data[V_index] - V_Population_Mean) ** 2)
    }
    
    let V_Total_Population_Calculation = V_Population_computation_result.reduce((V_count, V_current_value) => V_count + V_current_value, 0);

    let V_Population_Variance_Result = V_Total_Population_Calculation / V_Population_Data.length;

    show_Result.innerHTML = `Variance = ${V_Population_Variance_Result.toFixed(2)}`;


})


Sample_Variance_Button.addEventListener('click', () => {
    let V_Sample_computation_result = [];
    let V_Sample_Mean = get_mean(input);
    let V_Sample_Data = get_input(input);
    let V_Sample_Sorted_Data = V_Sample_Data.sort();
    
    for (let SV_index = 0 ; SV_index < V_Sample_Sorted_Data.length ; SV_index++){
        V_Sample_computation_result.push((V_Sample_Sorted_Data[SV_index] - V_Sample_Mean) ** 2)
    }
    
    let Total_V_Sample_Calculation = V_Sample_computation_result.reduce((SV_count, SV_current_value) => SV_count + SV_current_value, 0);

    let V_Sample_Variance_Result = Total_V_Sample_Calculation / (V_Sample_Data.length - 1);

    show_Result.innerHTML = `Sample Variance = ${V_Sample_Variance_Result.toFixed(2)}`;

})


Population_Standard_Deviation_Button.addEventListener('click', () => {
    let SD_Population_computation_result = [];
    let SD_Population_Mean = get_mean(input);
    let SD_Population_Data = get_input(input);
    let SD_Population_Sorted_Data = SD_Population_Data.sort();
    
    for (let SD_index = 0 ; SD_index < SD_Population_Sorted_Data.length ; SD_index++){
        SD_Population_computation_result.push((SD_Population_Sorted_Data[SD_index] - SD_Population_Mean) ** 2)
    }
    
    let SD_Total_Population_Calculation = SD_Population_computation_result.reduce((SD_count, SD_current_value) => SD_count + SD_current_value, 0);

    let SD_Population_Result = SD_Total_Population_Calculation / SD_Population_Data.length;

    show_Result.innerHTML = `Standard Deviation = ${Math.sqrt(SD_Population_Result).toFixed(2)}`;

})

Sample_Standard_Deviation_Button.addEventListener('click', () => {
    let SD_Sample_computation_result = [];
    let SD_Sample_Mean = get_mean(input);
    let SD_Sample_Data = get_input(input);
    let SD_Sample_Sorted_Data = SD_Sample_Data.sort();
    
    for (let SD_Sample_index = 0 ; SD_Sample_index < SD_Sample_Sorted_Data.length ; SD_Sample_index++){
        SD_Sample_computation_result.push((SD_Sample_Sorted_Data[SD_Sample_index] - SD_Sample_Mean) ** 2)
    }
    
    let Total_SD_Sample_Calculation = SD_Sample_computation_result.reduce((SD_Sample_count, SD_Sample_current_value) => SD_Sample_count + SD_Sample_current_value, 0);

    let SD_Sample_Result = Total_SD_Sample_Calculation / (SD_Sample_Data.length - 1);

    show_Result.innerHTML = `Sample Standard Deviation = ${Math.sqrt(SD_Sample_Result).toFixed(2)}`;

})

Coefficient_Variance_Button.addEventListener('click', () => {
    let CV_computation_result = [];
    let CV_Mean = get_mean(input);
    let CV_Data = get_input(input);
    let CV_Sorted_Data = CV_Data.sort();
    
    for (let CV_index = 0 ; CV_index < CV_Sorted_Data.length ; CV_index++){
        CV_computation_result.push((CV_Sorted_Data[CV_index] - CV_Mean) ** 2)
    }
    
    let Total_CV_Calculation = CV_computation_result.reduce((CV_count, CV_current_value) => CV_count + CV_current_value, 0);

    let CV_Result = Total_CV_Calculation / (CV_Data.length - 1);

    let CV_Coe = (Math.sqrt(CV_Result) / CV_Mean) * 100

    show_Result.innerHTML = `Coefficient Variance = ${CV_Coe.toFixed(2)}%`;
})

clear_Data.addEventListener('click', () =>{
    input.value = ''
    document.getElementById('data-container').textContent ='';
    show_Result.innerHTML = '';
})