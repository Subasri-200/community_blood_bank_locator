const User = require('./models/User');
const BloodBank = require('./models/BloodBank');
const BloodRequest = require('./models/BloodRequest');

const seedRunner = async () => {
  try {
    console.log('Seeding Users (Admin & Regular User)...');
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@bloodbank.com',
      password: 'Admin@123',
      phone: '9876543210',
      role: 'admin',
    });

    const sampleUser = await User.create({
      name: 'John Doe',
      email: 'user@bloodbank.com',
      password: 'User@123',
      phone: '9123456789',
      role: 'user',
    });

    console.log('Seeding 8 Blood Banks with realistic coordinates & inventory...');

    const sampleBloodBanks = [
      {
        name: 'Indian Red Cross Society Blood Centre',
        address: '50, Montieth Road, Egmore',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600008',
        phone: '+91 44 2855 4422',
        email: 'redcross.chennai@bloodbank.org',
        openingTime: '08:00 AM',
        closingTime: '09:00 PM',
        latitude: 13.0827,
        longitude: 80.2707,
        bloodAvailability: {
          'A+': { availableUnits: 18 },
          'A-': { availableUnits: 3 },
          'B+': { availableUnits: 12 },
          'B-': { availableUnits: 0 },
          'AB+': { availableUnits: 15 },
          'AB-': { availableUnits: 2 },
          'O+': { availableUnits: 25 },
          'O-': { availableUnits: 5 },
        },
      },
      {
        name: 'Rotary Club Blood Bank',
        address: 'Dr. E. Moses Road, Mahalaxmi',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400011',
        phone: '+91 22 2430 8899',
        email: 'rotary.mumbai@bloodbank.org',
        openingTime: '24 Hours',
        closingTime: '24 Hours',
        latitude: 19.0760,
        longitude: 72.8777,
        bloodAvailability: {
          'A+': { availableUnits: 20 },
          'A-': { availableUnits: 8 },
          'B+': { availableUnits: 30 },
          'B-': { availableUnits: 4 },
          'AB+': { availableUnits: 6 },
          'AB-': { availableUnits: 1 },
          'O+': { availableUnits: 40 },
          'O-': { availableUnits: 10 },
        },
      },
      {
        name: 'AIIMS Main Blood Bank Center',
        address: 'Sri Aurobindo Marg, Ansari Nagar',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110029',
        phone: '+91 11 2658 8500',
        email: 'aiims.delhi@bloodbank.org',
        openingTime: '24 Hours',
        closingTime: '24 Hours',
        latitude: 28.5672,
        longitude: 77.2100,
        bloodAvailability: {
          'A+': { availableUnits: 14 },
          'A-': { availableUnits: 2 },
          'B+': { availableUnits: 22 },
          'B-': { availableUnits: 5 },
          'AB+': { availableUnits: 8 },
          'AB-': { availableUnits: 0 },
          'O+': { availableUnits: 35 },
          'O-': { availableUnits: 6 },
        },
      },
      {
        name: 'Lions Blood Bank & Research Centre',
        address: '21, JC Road, Near Town Hall',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560002',
        phone: '+91 80 2222 3456',
        email: 'lions.blr@bloodbank.org',
        openingTime: '08:00 AM',
        closingTime: '10:00 PM',
        latitude: 12.9716,
        longitude: 77.5946,
        bloodAvailability: {
          'A+': { availableUnits: 9 },
          'A-': { availableUnits: 0 },
          'B+': { availableUnits: 16 },
          'B-': { availableUnits: 2 },
          'AB+': { availableUnits: 11 },
          'AB-': { availableUnits: 4 },
          'O+': { availableUnits: 19 },
          'O-': { availableUnits: 1 },
        },
      },
      {
        name: 'NTR Memorial Blood Bank',
        address: 'Road No. 2, Banjara Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500034',
        phone: '+91 40 2355 6789',
        email: 'ntr.hyd@bloodbank.org',
        openingTime: '24 Hours',
        closingTime: '24 Hours',
        latitude: 17.3850,
        longitude: 78.4867,
        bloodAvailability: {
          'A+': { availableUnits: 25 },
          'A-': { availableUnits: 6 },
          'B+': { availableUnits: 18 },
          'B-': { availableUnits: 3 },
          'AB+': { availableUnits: 14 },
          'AB-': { availableUnits: 2 },
          'O+': { availableUnits: 28 },
          'O-': { availableUnits: 7 },
        },
      },
      {
        name: 'Central Blood Bank Kolkata',
        address: '205, Vivekanda Road, Maniktala',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700006',
        phone: '+91 33 2212 9000',
        email: 'central.kolkata@bloodbank.org',
        openingTime: '09:00 AM',
        closingTime: '08:00 PM',
        latitude: 22.5726,
        longitude: 88.3639,
        bloodAvailability: {
          'A+': { availableUnits: 11 },
          'A-': { availableUnits: 1 },
          'B+': { availableUnits: 21 },
          'B-': { availableUnits: 4 },
          'AB+': { availableUnits: 7 },
          'AB-': { availableUnits: 0 },
          'O+': { availableUnits: 16 },
          'O-': { availableUnits: 3 },
        },
      },
      {
        name: 'Sahyadri Specialty Blood Bank',
        address: 'Karve Road, Erandwane',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411004',
        phone: '+91 20 2540 3000',
        email: 'sahyadri.pune@bloodbank.org',
        openingTime: '08:30 AM',
        closingTime: '09:30 PM',
        latitude: 18.5204,
        longitude: 73.8567,
        bloodAvailability: {
          'A+': { availableUnits: 16 },
          'A-': { availableUnits: 4 },
          'B+': { availableUnits: 10 },
          'B-': { availableUnits: 0 },
          'AB+': { availableUnits: 12 },
          'AB-': { availableUnits: 3 },
          'O+': { availableUnits: 22 },
          'O-': { availableUnits: 8 },
        },
      },
      {
        name: 'Prathama Blood Centre',
        address: 'Vasna Barrage Road, Paldi',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380007',
        phone: '+91 79 2660 0100',
        email: 'prathama.ahmedabad@bloodbank.org',
        openingTime: '24 Hours',
        closingTime: '24 Hours',
        latitude: 23.0225,
        longitude: 72.5714,
        bloodAvailability: {
          'A+': { availableUnits: 30 },
          'A-': { availableUnits: 7 },
          'B+': { availableUnits: 25 },
          'B-': { availableUnits: 5 },
          'AB+': { availableUnits: 18 },
          'AB-': { availableUnits: 2 },
          'O+': { availableUnits: 45 },
          'O-': { availableUnits: 12 },
        },
      },
    ];

    for (const bank of sampleBloodBanks) {
      await BloodBank.create(bank);
    }

    console.log('Seeding Sample Blood Requests...');
    await BloodRequest.create({
      userId: sampleUser._id,
      patientName: 'Robert Smith',
      bloodGroup: 'O+',
      unitsRequired: 2,
      hospitalName: 'Apollo Hospital',
      hospitalAddress: 'Greams Road, Thousand Lights',
      city: 'Chennai',
      contactNumber: '9876501234',
      emergencyLevel: 'Critical',
      additionalMessage: 'Urgent requirement for heart surgery.',
      status: 'Pending',
    });

    await BloodRequest.create({
      userId: sampleUser._id,
      patientName: 'Anita Sharma',
      bloodGroup: 'B+',
      unitsRequired: 1,
      hospitalName: 'Fortis Healthcare',
      hospitalAddress: 'Bannerghatta Road',
      city: 'Bangalore',
      contactNumber: '9123409876',
      emergencyLevel: 'Urgent',
      additionalMessage: 'Dengue recovery support.',
      status: 'Accepted',
    });

    console.log('Database auto-seeding completed successfully!');
  } catch (err) {
    console.error('Seed runner failed:', err.message);
  }
};

module.exports = seedRunner;
