function submitForm(event) {
    event.preventDefault();
  
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];
  
    if (photoFile && !photoFile.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение.');
      return;
    }
  
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const company = document.getElementById("company").value;
    const positionValue = document.querySelector('input[name="position"]:checked').value;
    const github = document.getElementById("github").value;
    const linkedin = document.getElementById("linkedin").value;
    const instagram = document.getElementById("instagram").value;
    const telegram = document.getElementById("telegram").value;
  
    const errors = validateForm(name, lastname, company, positionValue, github, linkedin, instagram, telegram);
  
    if (errors.length > 0) {
      alert(errors.join('\n'));
    } else {
      const displayDiv = document.querySelector(".right-side");
      displayDiv.style.transform = "translateX(20px)";
  
      const reader = new FileReader();
  
      reader.onload = function(e) {
        setTimeout(() => {
          displayDiv.innerHTML = `
            <img class="right-profile" src="${e.target.result}" alt="User Photo">
            <p>ФИО: ${name} ${lastname}</p>
            <p>Компания: ${company} 
            <img class="logo" src="${getCompanyLogoPath(company)}" alt="${company} Logo"></p>
            <p>Должность: ${positionLabels[positionValue]}</p>
            <div class="social-links">
              ${github ? `<a href="${github}" target="_blank" class="social-link"><img src="img/githubb.png" alt="GitHub Logo"></a>` : `<img src="img/githubb.png" alt="Inactive GitHub Logo" class="inactive-logo">`}
              ${linkedin ? `<a href="${linkedin}" target="_blank" class="social-link"><img src="img/linkedin.png" alt="LinkedIn Logo"></a>` : `<img src="img/linkedin.png" alt="Inactive LinkedIn Logo" class="inactive-logo">`}
              ${instagram ? `<a href="${instagram}" target="_blank" class="social-link"><img src="img/instagram.png" alt="Instagram Logo"></a>` : `<img src="img/instagram.png" alt="Inactive Instagram Logo" class="inactive-logo">`}
              ${telegram ? `<a href="${telegram}" target="_blank" class="social-link"><img src="img/telegram.png" alt="Telegram Logo"></a>` : `<img src="img/telegram.png" alt="Inactive Telegram Logo" class="inactive-logo">`}
            </div>
          `;
        });
      };
  
      reader.readAsDataURL(photoFile);
    }
  }
  
  function updateLogo() {
    const select = document.getElementById("company");
    const logo = document.getElementById("companyLogo");
  
    const selectedCompany = select.value;
  
    switch (selectedCompany) {
      case "meta":
        logo.src = "img/meta-Logo.png";
        break;
      case "apple":
        logo.src = "img/apple-logo.png";
        break;
      case "amazon":
        logo.src = "img/amazon-logo.png";
        break;
      case "netflix":
        logo.src = "img/netflix-logo.png"
        break;
      case "google":
        logo.src = "img/google-logo.png";
        break;
      case "microsoft":
        logo.src = "img/microsoft-logo.png";
        break;
      default:
        logo.src = "";
    }
  }
  
  function getCompanyLogoPath(company) {
    switch (company) {
      case "meta":
        return "img/meta-Logo.png";
      case "apple":
        return "img/apple-logo.png";
      case "amazon":
        return "img/amazon-logo.png";
      case "netflix":
        return "img/netflix-logo.png"
      case "google":
        return "img/google-logo.png";
      case "microsoft":
        return "img/microsoft-logo.png";
      default:
        return "";
    }
  }
  
  const positionLabels = {
    intern: "Software Engineer Intern👶",
    junior: "Junior Software Engineer🙂",
    engineer: "Software Engineer😉",
    senior: "Senior Software Engineer😎"
  };
  
  function validateForm(name, lastname, company, position, github, linkedin, instagram, telegram) {
    const errors = [];
  
    if (!name.trim()) {
      errors.push("Введите имя");
    }
  
    if (!lastname.trim()) {
      errors.push("Введите фамилию");
    }
  
    if (company === "select") {
      errors.push("Выберите компанию");
    }
  
    if (!position) {
      errors.push("Выберите должность");
    }
  
    if (github && !isValidURL(github)) {
      errors.push("Некорректная ссылка на GitHub");
    }
  
    if (linkedin && !isValidURL(linkedin)) {
      errors.push("Некорректная ссылка на LinkedIn");
    }
  
    if (instagram && !isValidURL(instagram)) {
      errors.push("Некорректная ссылка на Instagram");
    }
  
    if (telegram && !isValidURL(telegram)) {
      errors.push("Некорректная ссылка на Telegram");
    }
  
    return errors;
  }
  
  function isValidURL(url) {
    const urlPattern = /^https?:\/\/\S+/;
    return urlPattern.test(url);
  }