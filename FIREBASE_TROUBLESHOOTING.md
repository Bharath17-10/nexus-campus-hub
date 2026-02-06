# 🔧 Firebase Authentication Troubleshooting

## ⚠️ Common Error: "Missing or Invalid Credentials"

If you're seeing this error when trying to sign up or login, it means **Firebase Authentication is not enabled** in your Firebase Console.

---

## ✅ Quick Fix (5 minutes)

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select your project: **nexus-campus-hub**

### Step 2: Enable Authentication
1. In the **left sidebar**, click **"Build"**
2. Click **"Authentication"**
3. Click the **"Get started"** button (big blue button)

### Step 3: Enable Email/Password Sign-in
1. You'll see a tab called **"Sign-in method"** (should be selected by default)
2. Look for **"Email/Password"** in the providers list
3. Click on **"Email/Password"**
4. Toggle the **"Enable"** switch to ON
5. Click **"Save"**

### Step 4: Enable Firestore Database
1. Left sidebar → **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** → Click **"Next"**
4. Choose your location (closest to you) → Click **"Enable"**
5. Wait for database to be created (30 seconds)

### Step 5: Enable Storage
1. Left sidebar → **"Build"** → **"Storage"**
2. Click **"Get started"**
3. Select **"Start in test mode"** → Click **"Next"**
4. Click **"Done"**

---

## 🧪 Test After Enabling

1. **Refresh your browser** at http://localhost:8081/
2. Click **"Sign up"**
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click **"Create Account"**

You should now see:
✅ "Account created successfully! Redirecting..."

---

## 📸 Visual Checklist

After enabling everything, you should see:

**In Firebase Console → Authentication:**
- ✅ Email/Password: **Enabled**

**In Firebase Console → Firestore Database:**
- ✅ Database created in **test mode**

**In Firebase Console → Storage:**
- ✅ Storage bucket created in **test mode**

---

## 🐛 Still Having Issues?

### Error: "Email already in use"
- This email is already registered
- Try logging in instead of signing up
- Or use a different email

### Error: "Operation not allowed"
- Email/Password authentication is not enabled
- Follow Step 3 above to enable it

### Error: "Invalid credential"
- Check your email and password are correct
- Make sure you're using the right account

---

## 📞 Need More Help?

If you're still stuck:
1. Check the browser console (F12) for detailed errors
2. Make sure all three services are enabled:
   - ✅ Authentication
   - ✅ Firestore Database
   - ✅ Storage
3. Verify your `.env.local` file has the correct Firebase credentials

---

**Once you enable these services, everything will work perfectly!** 🚀
