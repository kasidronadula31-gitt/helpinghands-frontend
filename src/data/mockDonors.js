// ============================================================
// MOCK DONOR DATA (JavaScript version)
// ============================================================

export const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

// Simulated donor database
const allDonors = [
  { id: 1, name: "Arjun Sharma", email: "arjun.sharma@gmail.com", phone: "9876543210", bloodGroup: "O+", city: "Chennai", distance: 5, lastDonated: "2024-08-10", isAvailable: true },
  { id: 2, name: "Priya Nair", email: "priya.nair@gmail.com", phone: "9812345678", bloodGroup: "A+", city: "Coimbatore", distance: 12, lastDonated: "2024-06-20", isAvailable: true },
  { id: 3, name: "Ravi Kumar", email: "ravi.kumar@gmail.com", phone: "9898989898", bloodGroup: "B+", city: "Madurai", distance: 25, lastDonated: "2024-03-15", isAvailable: true },
  { id: 4, name: "Sneha Reddy", email: "sneha.reddy@gmail.com", phone: "9123456789", bloodGroup: "AB+", city: "Hyderabad", distance: 40, lastDonated: "2024-07-01", isAvailable: true },
  { id: 5, name: "Manoj Patel", email: "manoj.patel@gmail.com", phone: "9456789012", bloodGroup: "O-", city: "Trichy", distance: 18, lastDonated: "2024-05-12", isAvailable: false },
  { id: 6, name: "Kavya Iyer", email: "kavya.iyer@gmail.com", phone: "9345678901", bloodGroup: "A-", city: "Salem", distance: 35, lastDonated: "2024-09-01", isAvailable: true },
  { id: 7, name: "Deepak Singh", email: "deepak.singh@gmail.com", phone: "9234567890", bloodGroup: "B-", city: "Tirunelveli", distance: 60, lastDonated: "2024-04-22", isAvailable: true },
  { id: 8, name: "Ananya Menon", email: "ananya.menon@gmail.com", phone: "9567890123", bloodGroup: "AB-", city: "Kochi", distance: 80, lastDonated: "2024-02-18", isAvailable: true },
  { id: 9, name: "Vijay Murugan", email: "vijay.murugan@gmail.com", phone: "9678901234", bloodGroup: "O+", city: "Vellore", distance: 15, lastDonated: "2024-07-30", isAvailable: true },
  { id: 10, name: "Lakshmi Devi", email: "lakshmi.devi@gmail.com", phone: "9789012345", bloodGroup: "A+", city: "Pondicherry", distance: 90, lastDonated: "2024-01-05", isAvailable: false },
  { id: 11, name: "Suresh Babu", email: "suresh.babu@gmail.com", phone: "9890123456", bloodGroup: "B+", city: "Chennai", distance: 8, lastDonated: "2024-08-25", isAvailable: true },
  { id: 12, name: "Meena Krishnan", email: "meena.krishnan@gmail.com", phone: "9901234567", bloodGroup: "O+", city: "Chennai", distance: 3, lastDonated: "2024-09-10", isAvailable: true },
  { id: 13, name: "Karthik Raj", email: "karthik.raj@gmail.com", phone: "9011223344", bloodGroup: "AB+", city: "Bangalore", distance: 150, lastDonated: "2024-06-08", isAvailable: true },
  { id: 14, name: "Divya Subramanian", email: "divya.subramanian@gmail.com", phone: "9022334455", bloodGroup: "A-", city: "Coimbatore", distance: 55, lastDonated: "2024-05-20", isAvailable: true },
  { id: 15, name: "Arun Prakash", email: "arun.prakash@gmail.com", phone: "9033445566", bloodGroup: "O-", city: "Madurai", distance: 200, lastDonated: "2024-03-01", isAvailable: true },
];

// 🔍 Search donors
export function searchDonors(bloodGroup, maxDistance) {
  return allDonors
    .filter((d) => {
      const groupMatch = bloodGroup === "ALL" || d.bloodGroup === bloodGroup;
      const distanceMatch = d.distance <= maxDistance;
      return groupMatch && distanceMatch;
    })
    .sort((a, b) => a.distance - b.distance);
}

// ➕ Add donor
export function addDonorToList(newDonor) {
  const donor = {
    ...newDonor,
    id: allDonors.length + 1,
  };
  allDonors.push(donor);
  return donor;
}

// 📊 Total donors
export function getTotalDonors() {
  return allDonors.length;
}