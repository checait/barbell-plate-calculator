(function(){
    console.log('reading JS');

    const inputForm = document.querySelector('#weight-input-form');
    const weightContainer = document.querySelector('#barbell-container');

    const leftSide = document.querySelector('#left-side');
    const rightSide = document.querySelector('#right-side');

    let barbellWeight = 45;

    
    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        leftSide.replaceChildren();
        rightSide.replaceChildren();
        weightContainer.style.display = 'flex';

        const formData = new FormData(inputForm);
        const weight = formData.get("weight");
        barbellWeight = formData.get("barbell-weight").trim().length === 0 ? 45 : formData.get("barbell-weight");

        console.log(barbellWeight);
        console.log(weight);

        const weightArray = calculateWeights(weight, barbellWeight);
        console.log(weightArray);

        weightArray.forEach(plate => {
            const newWeight = document.createElement('div');

            if (plate === 2.5) {
                newWeight.className = "weight-plate plate-2-5"
            } else {
                newWeight.className = `weight-plate plate-${plate}`;
            }
            newWeight.append(plate);
            
            rightSide.append(newWeight);
            leftSide.append(newWeight.cloneNode(true));
        })
        

    })

    function calculateWeights (weight, barbellWeight) {
        let numOf45s;
        let numOf35s;
        let numOf25s;
        let numOf10s;
        let numOf5s;
        let numOfHalf5s;
        let numOf1s;
        let remainder;

        weight = (weight - barbellWeight) / 2;


        const weightArray = []

        numOf45s = Math.floor(weight / 45);
        remainder = weight % 45;
        appendToArray(numOf45s, weightArray, 45);
        
        numOf35s = Math.floor(remainder / 35);
        remainder = remainder % 35;
        appendToArray(numOf35s, weightArray, 35);

        numOf25s = Math.floor(remainder / 25);
        remainder = remainder % 25;
        appendToArray(numOf25s, weightArray, 25);

        numOf10s = Math.floor(remainder / 10);
        remainder = remainder % 10;
        appendToArray(numOf10s, weightArray, 10);

        numOf5s = Math.floor(remainder / 5);
        remainder = remainder % 5;
        appendToArray(numOf5s, weightArray, 5);

        numOfHalf5s = Math.floor(remainder / 2.5);
        remainder = remainder % 2.5;
        appendToArray(numOfHalf5s, weightArray, 2.5);

        numOf1s = remainder;
        appendToArray(numOf1s, weightArray, 1);

        console.log(`45s: ${numOf45s}, ` + `25s: ${numOf25s}, ` + `35s: ${numOf35s}, ` + `10s: ${numOf10s}, ` + `5s: ${numOf5s}, ` + `2.5s: ${numOfHalf5s}, ` + `1s: ${numOf1s}`);

        return weightArray;

    }

    function appendToArray(plateWeight, array, plateAmount) {
        if (plateWeight >= 1) {
            for (let i = 0; i < plateWeight; i++) {
                array.push(plateAmount);
            }
        }
        
    }

}) ()