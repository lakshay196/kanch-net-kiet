import {
  EXPECTED_SAMPLE_TOTALS,
  SAMPLE_BUYER_TEXT,
  SAMPLE_UNCONFIRMED_ORDER,
  SEED_BATCHES,
  SEED_LISTINGS,
  SEED_SUPPLIERS,
} from "@/data/demo-bangle-order";
import StageHeader from "@/components/demo/StageHeader";
import StageSection from "@/components/demo/StageSection";

/**
 * A1 static shell. Labels are read from Builder B's fixture for display.
 * Eligibility, planning, inventory, and settlement are not calculated here.
 */

const discoverySamples = [
  {
    rowId: "ROW-101",
    displayId: "B-101",
    tone: "ok",
    status: "In the rehearsed sample",
    reason: "Shown as stock that can join the sample order.",
  },
  {
    rowId: "ROW-102",
    displayId: "B-102",
    tone: "ok",
    status: "In the rehearsed sample",
    reason: "Shown as stock that can join the sample order.",
  },
  {
    rowId: "ROW-103",
    displayId: "B-103",
    tone: "ok",
    status: "In the rehearsed sample",
    reason: "Shown as stock that can join the sample order.",
  },
  {
    rowId: "ROW-104",
    displayId: "B-104",
    tone: "no",
    status: "Excluded in the sample",
    reason: "Size is 2.6; the buyer asked for 2.4.",
  },
  {
    rowId: "ROW-105",
    displayId: "B-105",
    tone: "no",
    status: "Excluded in the sample",
    reason: "Same physical batch as B-101. Those pieces are not counted twice.",
  },
] as const;

const planSamples = [
  { rowId: "ROW-101", displayId: "B-101" },
  { rowId: "ROW-102", displayId: "B-102" },
  { rowId: "ROW-103", displayId: "B-103" },
] as const;

function supplierFor(supplierId: string) {
  const supplier = SEED_SUPPLIERS.find((item) => item.supplierId === supplierId);
  if (!supplier) {
    throw new Error(`Missing sample supplier ${supplierId}`);
  }
  return supplier;
}

function batchFor(rowId: string) {
  const batch = SEED_BATCHES.find((item) => item.rowId === rowId);
  if (!batch) {
    throw new Error(`Missing sample batch ${rowId}`);
  }
  return batch;
}

function listingFor(listingId: string) {
  const listing = SEED_LISTINGS.find((item) => item.listingId === listingId);
  if (!listing) {
    throw new Error(`Missing sample listing ${listingId}`);
  }
  return listing;
}

function pieces(value: number) {
  return `${new Intl.NumberFormat("en-IN").format(value)} pieces`;
}

function rupee(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function sampleDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function Field({
  label,
  labelHi,
  value,
  missing = false,
}: {
  label: string;
  labelHi: string;
  value: string;
  missing?: boolean;
}) {
  return (
    <div className="demo-field">
      <span className="demo-label">
        {label} <span lang="hi">/ {labelHi}</span>
      </span>
      <span className={missing ? "demo-value is-missing" : "demo-value"}>
        {value}
      </span>
    </div>
  );
}

export default function DemoShell() {
  const draft = SAMPLE_UNCONFIRMED_ORDER;
  const totals = EXPECTED_SAMPLE_TOTALS;

  return (
    <>
      <StageHeader />
      <main className="demo-main" id="demo-main">
        <div className="demo-intro">
          <h1 className="demo-display">
            One glass-bangle order, four stages
            <span lang="hi">एक काँच-चूड़ी ऑर्डर, चार चरण</span>
          </h1>
          <p>
            A buyer describes 1,000 bangles. Suppliers cover that ask together.
            This page opens directly, with no portal login.
          </p>
          <p className="demo-muted" lang="hi">
            खरीदार 1,000 चूड़ियों की माँग लिखता है। कई आपूर्तिकर्ता मिलकर वह
            मात्रा पूरी करते हैं। यह पेज बिना लॉगिन खुलता है।
          </p>
        </div>

        <StageSection
          id="buyer-request"
          kicker="Stage 1 · first focus"
          title="Buyer request"
          titleHi="खरीदार की माँग"
          role="Buyer"
          roleHi="खरीदार"
          gate="The order cannot move on while colour or finish is missing."
          gateHi="रंग या फिनिश खाली हो तो माँग आगे नहीं बढ़ती।"
        >
          <blockquote className="demo-quote">{SAMPLE_BUYER_TEXT}</blockquote>
          <div className="demo-fields">
            <Field label="Product" labelHi="सामान" value="Glass bangle" />
            <Field
              label="Quantity"
              labelHi="मात्रा"
              value={pieces(draft.quantityNeeded)}
            />
            <Field label="Size" labelHi="साइज़" value={draft.sizeCode ?? "Missing"} />
            <Field
              label="Delivery date"
              labelHi="तारीख"
              value={
                draft.deliveryDate
                  ? `${sampleDate(draft.deliveryDate)} · demo year 2026`
                  : "Missing"
              }
            />
            <Field
              label="Colour"
              labelHi="रंग"
              value={draft.colour ?? "Missing"}
              missing={draft.colour === null}
            />
            <Field
              label="Design / finish"
              labelHi="फिनिश"
              value={draft.designFinish ?? "Missing"}
              missing={draft.designFinish === null}
            />
            <Field
              label="Delivery locality"
              labelHi="जगह"
              value={draft.deliveryLocality ?? "Missing"}
            />
          </div>
          <div className="demo-actions">
            <button
              type="button"
              className="demo-button"
              aria-disabled="true"
              aria-describedby="buyer-request-gate"
            >
              Confirm request · locked
            </button>
            <p className="demo-muted">
              The next action stays locked until the missing fields are filled.
            </p>
          </div>
        </StageSection>

        <StageSection
          id="supplier-discovery"
          kicker="Stage 2"
          title="Supplier discovery"
          titleHi="आपूर्तिकर्ता खोजना"
          role="Coordinator"
          roleHi="समन्वयक"
          gate="Stock that does not match is marked excluded, with a plain reason."
          gateHi="जो स्टॉक मेल नहीं खाता, वह कारण के साथ अलग दिखता है।"
        >
          <p className="demo-muted">
            Rehearsed sample rows. The working check arrives in a later step.
            Artisan <span lang="hi">/ कारीगर</span> names below are illustrative.
          </p>
          <div className="demo-rows">
            {discoverySamples.map((sample) => {
              const batch = batchFor(sample.rowId);
              const supplier = supplierFor(batch.supplierId);
              const listing = listingFor(batch.listingId);
              return (
                <article className="demo-row" key={sample.rowId}>
                  <header>
                    <h3>
                      {sample.displayId} · {supplier.displayName}
                    </h3>
                    <span className={`demo-pill is-${sample.tone}`}>
                      {sample.status}
                    </span>
                  </header>
                  <p className="demo-meta">
                    <span>{supplier.locality}</span>
                    <span>{batch.distanceKm} km</span>
                    <span>{pieces(batch.declaredQty)}</span>
                    <span>Size {listing.sizeCode}</span>
                    <span>
                      Illustrative acceptance rate {batch.illustrativeAcceptanceRate}
                    </span>
                  </p>
                  <p>{sample.reason}</p>
                </article>
              );
            })}
          </div>
        </StageSection>

        <StageSection
          id="aggregation"
          kicker="Stage 3 · second focus"
          title="Aggregation"
          titleHi="मात्रा जोड़ना"
          role="Coordinator"
          roleHi="समन्वयक"
          gate="Approval stays locked when the plan does not cover the pieces asked."
          gateHi="मांगी गई मात्रा पूरी न हो तो मंजूरी बंद रहती है।"
        >
          <div className="demo-figures">
            <div className="demo-figure">
              <span className="demo-label">Pieces asked / मांगी मात्रा</span>
              <strong>{pieces(draft.quantityNeeded)}</strong>
            </div>
            <div className="demo-figure">
              <span className="demo-label">Shortfall gate / कमी पर रोक</span>
              <strong>Locked</strong>
              <span className="demo-muted">
                Approval cannot open while the request is still missing colour
                and finish.
              </span>
            </div>
          </div>
          <p className="demo-muted">
            Rehearsed cover, shown as a label only: B-101, B-102, and B-103.
          </p>
          <div className="demo-plan">
            {planSamples.map((sample) => {
              const batch = batchFor(sample.rowId);
              const supplier = supplierFor(batch.supplierId);
              return (
                <article className="demo-plan-line" key={sample.rowId}>
                  <header>
                    <h3>
                      {sample.displayId} · {supplier.displayName}
                    </h3>
                    <span>{pieces(batch.declaredQty)}</span>
                  </header>
                  <p className="demo-meta">
                    <span>{supplier.locality}</span>
                    <span>{batch.distanceKm} km</span>
                  </p>
                </article>
              );
            })}
          </div>
          <div className="demo-actions">
            <button
              type="button"
              className="demo-button"
              aria-disabled="true"
              aria-describedby="aggregation-gate"
            >
              Approve plan · locked
            </button>
          </div>
        </StageSection>

        <StageSection
          id="quality-settlement"
          kicker="Stage 4"
          title="Quality and simulated settlement"
          titleHi="जाँच और सिम्युलेटेड हिसाब"
          role="Collector"
          roleHi="संग्रहकर्ता"
          gate="Settlement stays locked until accepted, rework, rejected, and damaged pieces equal the pieces collected."
          gateHi="जाँच की चार मात्राएँ, इकट्ठी मात्रा के बराबर हुए बिना हिसाब बंद रहता है।"
        >
          <div className="demo-fields">
            <Field label="Collected" labelHi="इकट्ठा" value={pieces(totals.collectedQty)} />
            <Field label="Accepted" labelHi="स्वीकृत" value={pieces(totals.acceptedQty)} />
            <Field label="Rework" labelHi="दोबारा काम" value={pieces(totals.reworkQty)} />
            <Field label="Rejected" labelHi="अस्वीकृत" value={pieces(totals.rejectedQty)} />
            <Field label="Damaged" labelHi="क्षतिग्रस्त" value={pieces(totals.damagedQty)} />
          </div>
          <div className="demo-figures">
            <div className="demo-figure">
              <span className="demo-label">Simulated supplier net</span>
              <strong>{rupee(totals.supplierNet)}</strong>
              <span className="demo-muted">Simulated. Not a payment.</span>
            </div>
            <div className="demo-figure">
              <span className="demo-label">Simulated buyer payable</span>
              <strong>{rupee(totals.buyerPayable)}</strong>
              <span className="demo-muted">
                Simulated. This is a different side of the sample, not profit.
              </span>
            </div>
          </div>
          <p>No payment is sent from this page.</p>
        </StageSection>
      </main>
    </>
  );
}
