# Intune‑Lab

## About the Project

The **Intune‑Lab** exists to give me (and anyone who follows along) hands‑on, end‑to‑end practice with **Intune**, **Autopilot**, **Entra ID**, **Defender for Endpoint**, and adjacent Microsoft 365 technologies.  The focus is on building a *production‑style* lab that:

* Automates new‑hire onboarding via Intune and Autopilot.
* Applies role‑based security and update policies using Entra dynamic groups.
* Demonstrates real‑world scenarios such as white‑glove provisioning, remote user OOBE, and mobile device management.

To keep things realistic, I asked ChatGPT to generate simulation data—a 25‑user **CSV import file** with randomized names, departments, and job titles.  That file (and every other artifact the lab produces) lives in this repo so you can clone, tweak, and reuse them in your own tenant.

> **Quick links**  
> • **Repo:** [`mbusbee505/Intune-Lab`](https://github.com/mbusbee505/Intune-Lab)  
> • **User CSV:** [`busbeecorp_user_import.csv`](https://raw.githubusercontent.com/mbusbee505/IntuneLab/main/busbeecorp_user_import.csv)

## Lab Outline

1. **Set up the lab environment**
	1. Sign up for free trials
	2. Upload users to Entra
	3. Create groups in Entra
	4. Assign licenses to users
2. **Enroll devices to Intune**
	1. Gather hardware hashes
	2. Create deployment profile
	3. Configure Enrollment Status Page
	4. Confirm OOBE proof‑of‑concept
3. **Improve OOBE experience**
	1. Remove unnecessary user prompts
4. **Install apps**
	1. Google Chrome
	2. Zoom
	3. Microsoft Office
	4. GlobalProtect VPN
5. **Configure update rings**
	1. Pilot group
	2. Broad user group
6. **Improve security posture**
	1. Install security baselines
	2. Connect Defender for Endpoint
	3. Create compliance policies
	4. Enforce compliance via Conditional Access
7. **Set up iPhone enrollments**
	1. Apple Push Notification certificate
	2. Company Portal app
	3. User login & profile installation
	4. Deploy Intune apps from Company Portal
8. **Set up Android enrollments**
	1. Connect Managed Google Play
	2. Company Portal login
	3. Deploy Intune apps from Managed Play Store


# Helpful Links

## Admin Portals

- **Intune admin center:** <https://intune.microsoft.com>
- **Entra admin center:** <https://entra.microsoft.com>
- **Defender portal:** <https://security.microsoft.com>

## Lab Resources

- **GitHub repo:** <https://github.com/mbusbee505/IntuneLab>
- **Users CSV:** <https://raw.githubusercontent.com/mbusbee505/IntuneLab/main/busbeecorp_user_import.csv>

## Microsoft 365 Free Trials

- **Intune free trial:** <https://aka.ms/IntuneTrial>
- **Entra ID free trial:** <https://aka.ms/EntraSuiteTrial>
- **Defender for Endpoint P2 trial:** <https://www.microsoft.com/security/business/endpoint-security/microsoft-defender-endpoint>


# Next: [[1. Setting Up The Lab]]