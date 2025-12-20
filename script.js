/*document.getElementById("analyzeBtn").addEventListener("click", function () {

    const url = document.getElementById("urlInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (url === "") {
        resultDiv.innerHTML = "<p class='dangerous'>Please enter a URL</p>";
        return;
    }

    let score = 0;
    let reasons = [];

    // SSL Check
    if (url.startsWith("https://")) {
        score += 20;
        reasons.push("Uses HTTPS (SSL secured connection)");
    } else {
        reasons.push("Does not use HTTPS (No SSL security)");
    }

    // Domain Extension-TLD
    if (url.includes(".com") || url.includes(".org") || url.includes(".edu") || url.includes(".gov")) {
        score += 15;
        reasons.push("Trusted domain extension detected");
    } else { 
        reasons.push("Uncommon domain extension");
    }

    // URL Structure
    if (url.length < 50 && !url.includes("@")) {
        score += 15;
        reasons.push("Clean and simple URL structure");
    } else {
        reasons.push("Long or suspicious URL structure");
    }

    // Suspicious Keywords
    if (!url.includes("free") && !url.includes("login") && !url.includes("verify")) {
        score += 15;
        reasons.push("No suspicious keywords found");
    } else {
        reasons.push("Suspicious keywords detected in URL");
    }

    // Domain Age (Simulated)
    score += 15;
    reasons.push("Domain appears to be older than 1 year");

    // Hosting & Reputation (Simulated)
    score += 20;
    reasons.push("Website hosted on reliable server with no bad reputation history");

    // Status
    let status = "";
    let className = "";

    if (score >= 70) {
        status = "SAFE";
        className = "safe";
    } else if (score >= 40) {
        status = "SUSPICIOUS";
        className = "suspicious";
    } else {
        status = "DANGEROUS";
        className = "dangerous";
    }

    resultDiv.innerHTML = `
        <h3 class="${className}">${status}</h3>
        <p><b>Trust Score:</b> ${score}/100</p>
        <h4>Reasons:</h4>
        <ul>
            ${reasons.map(r => `<li>${r}</li>`).join("")}
        </ul>
    `;
});

*/document.getElementById("analyzeBtn").addEventListener("click", function () {

    const url = document.getElementById("urlInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (url === "") {
        resultDiv.innerHTML = "<p class='dangerous'>Please enter a URL</p>";
        return;
    }

    let score = 0;
    let reasons = [];

    /* SSL CHECK */
    if (url.startsWith("https://")) {
        score += 20;
        reasons.push("Uses HTTPS (SSL secured connection)");
    } else {
        reasons.push("Does not use HTTPS (No SSL security)");
    }

    /* TLD CHECK */
    if (url.match(/\.(gov|edu|org)$/)) {
        score += 20;
        reasons.push("Highly trusted TLD detected (.gov/.edu/.org)");
    } 
    else if (url.match(/\.(xyz|top|free|tk)$/)) {
        score -= 15;
        reasons.push("Low‑trust TLD commonly used for spam");
    } 
    else if (url.match(/\.com$/)) {
        score += 10;
        reasons.push("Common commercial domain (.com)");
    }
    else{
        reasons.push("Uncommon domain extension");
    }

    /* URL STRUCTURE */
    if (url.length < 60 && !url.includes("@")) {
        score += 10;
        reasons.push("Clean and readable URL structure");
    } else {
        reasons.push("Long or suspicious URL structure");
    }

    /* SUSPICIOUS KEYWORDS */
    const suspiciousWords = ["free", "login", "verify", "secure", "update"];
    const foundKeyword = suspiciousWords.some(word => url.toLowerCase().includes(word));

    if (!foundKeyword) {
        score += 10;
        reasons.push("No suspicious keywords found");
    } else {
        score -= 10;
        reasons.push("Suspicious keywords detected in URL");
    }

    /* SUBDOMAIN SPAM CHECK */
    const dotCount = (url.match(/\./g) || []).length;
    if (dotCount > 4) {
        score -= 15;
        reasons.push("Too many subdomains detected (possible phishing)");
    } else {
        score += 5;
        reasons.push("Normal number of subdomains");
    }

    /* HOMOGRAPH ATTACK CHECK */
    const homographPattern = /[^\x00-\x7F]/;
    if (homographPattern.test(url)) {
        score -= 20;
        reasons.push("Possible homograph attack (look‑alike characters detected)");
    } else {
        score += 5;
        reasons.push("No homograph attack indicators found");
    }

    /* SIMULATED CHECKS */
    score += 10;
    reasons.push("Domain age appears reasonable (simulated)");

    score += 10;
    reasons.push("No known malicious hosting indicators (simulated)");

    /* FINAL STATUS */
    let status = "";
    let className = "";

    if (score >= 70) {
        status = "SAFE";
        className = "safe";
    } else if (score >= 40) {
        status = "SUSPICIOUS";
        className = "suspicious";
    } else {
        status = "DANGEROUS";
        className = "dangerous";
    }

     resultDiv.innerHTML = `
        <h3 class="${className}">${status}</h3>
        <p><b>Trust Score:</b> ${score}/100</p>
        <h4>Reasons:</h4>
        <ul>
            ${reasons.map(r => `<li>${r}</li>`).join("")}
        </ul>
    `;
});