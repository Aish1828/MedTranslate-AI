export default function Stats() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="text-5xl font-bold text-blue-600">
            50K+
          </h3>
          <p>Reports Processed</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="text-5xl font-bold text-cyan-600">
            12+
          </h3>
          <p>Languages</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="text-5xl font-bold text-green-600">
            95%
          </h3>
          <p>Accuracy</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="text-5xl font-bold text-purple-600">
            24/7
          </h3>
          <p>AI Support</p>
        </div>

      </div>
    </section>
  );
}