export default class Alert {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  async init() {
    const alerts = await this.getAlerts();
    if (alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async getAlerts() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Failed to load alerts");
      return await response.json();
    } catch (error) {
      console.error("Alert error:", error);
      return [];
    }
  }

  renderAlerts(alerts) {
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      p.style.padding = "0.75rem";
      p.style.margin = "0";

      alertSection.appendChild(p);
    });

    const main = document.querySelector("main");
    main.prepend(alertSection);
  }
}