import PageNav from "./PageNav";
import styles from "./Donate.module.css"; // Import the CSS module

export default function Donate() {
  return (
    <>
      <PageNav />
      <div className={styles.container}>
        <h1 className={styles.heading}>Support Our Mission</h1>
        <p className={styles.content}>
          Your generous donation helps us continue our mission to care for and
          protect animals in need. With your support, we can provide food,
          shelter, medical care, and a loving environment for animals until they
          find their forever homes. Every donation, big or small, makes a
          difference.
        </p>

        <h2 className={styles.subheading}>Ways to Donate</h2>
        <ul className={styles.donationOptions}>
          <li>One-time Donation</li>
          <li>Monthly Donation</li>
          <li>Sponsor an Animal</li>
          <li>In-Kind Donations</li>
        </ul>

        <h2 className={styles.subheading}>Donation Form</h2>
        <form className={styles.donationForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input type="text" id="name" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input type="email" id="email" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="amount" className={styles.label}>
              Donation Amount:
            </label>
            <select id="amount" className={styles.input}>
              <option value="25">$25</option>
              <option value="50">$50</option>
              <option value="100">$100</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>
            Donate Now
          </button>
        </form>

        <p className={styles.thankYou}>
          Thank you for your kindness and generosity!
        </p>
      </div>
    </>
  );
}
