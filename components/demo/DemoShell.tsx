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
    status: "In",
    reason: "",
  },
  {
    rowId: "ROW-102",
    displayId: "B-102",
    tone: "ok",
    status: "In",
    reason: "",
  },
  {
    rowId: "ROW-103",
    displayId: "B-103",
    tone: "ok",
    status: "In",
    reason: "",
  },
  {
    rowId: "ROW-104",
    displayId: "B-104",
    tone: "no",
    status: "Out",
    reason: "Size is 2.6. The buyer asked for 2.4.",
  },
  {
    rowId: "ROW-105",
    displayId: "B-105",
    tone: "no",
    status: "Out",
    reason: "Same physical batch as B-101. Not counted twice.",
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

function person(name: string) {
  return name.replace(" (Illustrative Supplier)", "");
}

function pieces(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
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

function Fact({
  label,
  value,
  missing = false,
}: {
  label: string;
  value: string;
  missing?: boolean;
}) {
  return (
    <div>
      <span className="demo-label">{label}</span>
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
        <section className="demo-hero" id="buyer-request" aria-labelledby="buyer-request-title">
          <p className="demo-kicker">01 · Buyer / खरीदार</p>
          <h1 id="buyer-request-title">{SAMPLE_BUYER_TEXT}</h1>
          <hr className="demo-rule" />
          <p className="demo-lead">
            Colour and finish are still blank, so this request cannot be
            confirmed. Demo year on the date is 2026.
          </p>
          <p className="demo-gate" id="buyer-request-gate" lang="hi">
            रंग या फिनिश खाली हो तो माँग आगे नहीं बढ़ती।
          </p>
          <div className="demo-facts">
            <Fact label="Product" value="Glass bangle" />
            <Fact label="Quantity" value={pieces(draft.quantityNeeded)} />
            <Fact label="Size" value={draft.sizeCode ?? "Missing"} />
            <Fact
              label="Date"
              value={draft.deliveryDate ? sampleDate(draft.deliveryDate) : "Missing"}
            />
            <Fact label="Colour" value={draft.colour ?? "Missing"} missing={draft.colour === null} />
            <Fact
              label="Finish"
              value={draft.designFinish ?? "Missing"}
              missing={draft.designFinish === null}
            />
            <Fact label="Place" value={draft.deliveryLocality ?? "Missing"} />
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
          </div>
        </section>

        <StageSection
          id="supplier-discovery"
          kicker="02 · Stock"
          title="Who has pieces"
          titleHi="किसके पास माल है"
          role="Coordinator"
          roleHi="समन्वयक"
          gate="Stock that does not match is left out, with a plain reason."
        >
          <div className="demo-lines">
            {discoverySamples.map((sample) => {
              const batch = batchFor(sample.rowId);
              const supplier = supplierFor(batch.supplierId);
              const listing = listingFor(batch.listingId);
              return (
                <article className="demo-line" key={sample.rowId}>
                  <strong>{sample.displayId}</strong>
                  <div>
                    <p className="demo-who">{person(supplier.displayName)}</p>
                    <p className="demo-meta">
                      {supplier.locality} · {batch.distanceKm} km · size {listing.sizeCode} · rate{" "}
                      {batch.illustrativeAcceptanceRate}
                    </p>
                    <p className={`demo-state is-${sample.tone}`}>
                      {sample.status}
                      {sample.reason ? ` · ${sample.reason}` : ""}
                    </p>
                  </div>
                  <p className="demo-who">{pieces(batch.declaredQty)}</p>
                </article>
              );
            })}
          </div>
        </StageSection>

        <StageSection
          id="aggregation"
          kicker="03 · Cover"
          title="Does it cover 1,000?"
          titleHi="क्या 1,000 पूरी होती है"
          role="Coordinator"
          roleHi="समन्वयक"
          gate="Approval stays locked until the request is confirmed and the pieces cover the ask."
        >
          <div className="demo-pair">
            <div>
              <span className="demo-label">Pieces asked</span>
              <strong>{pieces(draft.quantityNeeded)}</strong>
            </div>
            <div>
              <span className="demo-label">Approval</span>
              <strong>Locked</strong>
              <p className="demo-note">Colour and finish are still missing.</p>
            </div>
          </div>
          <div className="demo-lines">
            {planSamples.map((sample) => {
              const batch = batchFor(sample.rowId);
              const supplier = supplierFor(batch.supplierId);
              return (
                <article className="demo-line" key={sample.rowId}>
                  <strong>{sample.displayId}</strong>
                  <div>
                    <p className="demo-who">{person(supplier.displayName)}</p>
                    <p className="demo-meta">
                      {supplier.locality} · {batch.distanceKm} km
                    </p>
                  </div>
                  <p className="demo-who">{pieces(batch.declaredQty)}</p>
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
          kicker="04 · Settlement"
          title="Simulated money"
          titleHi="सिम्युलेटेड हिसाब"
          role="Collector"
          roleHi="संग्रहकर्ता"
          gate="Settlement stays locked until accepted, rework, rejected, and damaged pieces equal the pieces collected."
        >
          <p className="demo-note">
            {pieces(totals.collectedQty)} collected · {pieces(totals.acceptedQty)} accepted ·{" "}
            {pieces(totals.reworkQty)} rework · {pieces(totals.rejectedQty)} rejected ·{" "}
            {pieces(totals.damagedQty)} damaged
          </p>
          <div className="demo-pair">
            <div>
              <span className="demo-label">Supplier net · simulated</span>
              <strong>{rupee(totals.supplierNet)}</strong>
            </div>
            <div>
              <span className="demo-label">Buyer payable · simulated</span>
              <strong>{rupee(totals.buyerPayable)}</strong>
              <p className="demo-note">A different side of the sample. Not profit. No payment is sent.</p>
            </div>
          </div>
        </StageSection>
      </main>
    </>
  );
}
