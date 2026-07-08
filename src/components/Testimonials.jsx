export default function Testimonials() {
  return (
    <section className="py-24 px-8"
    id="testimonials">
      <h2 className="text-5xl font-bold text-center">
        What People Say
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-16">

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <p>
            "Understanding medical reports has never
            been easier."
          </p>

          <h4 className="mt-6 font-bold">
            Patient User
          </h4>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <p>
            "The translation feature is extremely useful
            for rural patients."
          </p>

          <h4 className="mt-6 font-bold">
            Healthcare Professional
          </h4>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <p>
            "The AI assistant saves valuable time."
          </p>

          <h4 className="mt-6 font-bold">
            Doctor
          </h4>
        </div>

      </div>
    </section>
  );
}