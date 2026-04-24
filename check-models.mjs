async function listModels() {
    const key = "AIzaSyDsyq4y6fvrcOaoTTGmY7hEIhMTs69p4gA";
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("--- AVAILABLE MODELS ON YOUR KEY ---");
        if (data.models) {
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found. Response:", JSON.stringify(data, null, 2));
        }
        console.log("-------------------------------------");
    } catch (err) {
        console.log("Check failed:", err.message);
    }
}

listModels();
