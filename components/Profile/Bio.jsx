import React from "react";

const Bio = () => {
  return (
    <div className="py-4 flex flex-col gap-y-2 h-full">
      <div className="h-48">
        <img
          src="https://picsum.photos/1920/1080"
          alt="banner"
          className="object-cover h-full w-full select-none rounded"
        />
      </div>
      <div className="py-2 px-4 h-full flex flex-col justify-between content-between">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor
        convallis convallis. Vestibulum faucibus purus sit amet leo ullamcorper
        faucibus. Suspendisse pulvinar sem sem, id dapibus risus dictum et.
        Proin dui arcu, dignissim sed sollicitudin vel, ultricies sit amet
        metus. Proin nec vulputate felis, a gravida enim. Morbi sed dui blandit,
        mollis orci at, gravida ipsum. Praesent in enim in sapien imperdiet
        ullamcorper et eget tellus. Etiam ut ligula vel risus tempus efficitur.
        Morbi fringilla nibh velit, in congue tortor mollis eu. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Aliquam vel faucibus
        dui. Donec bibendum aliquet neque ac mattis. Donec rhoncus quam nec
        lobortis finibus. Donec quis scelerisque ex. Quisque porta massa nec
        diam blandit, ac hendrerit sapien iaculis. Donec vitae urna lectus.
        Morbi vulputate condimentum risus tempus pretium. Fusce ac elementum
        turpis. Nunc id maximus nisl, vel tincidunt erat. Phasellus non tempor
        neque. Aenean consequat nisi augue, in hendrerit turpis imperdiet eu.
        Integer bibendum eros dolor, quis porttitor risus interdum et. Curabitur
        non tortor nulla. Phasellus luctus, magna eu venenatis congue, augue
        purus gravida augue, et porttitor dolor sapien varius purus. Maecenas
        eget arcu interdum, porttitor nisl a, dignissim orci. Ut sagittis diam
        non nisl viverra, eu dignissim lorem malesuada. In ipsum erat, laoreet a
        mi ut, pulvinar eleifend est. Donec erat enim, vehicula id urna ut,
        hendrerit suscipit massa. Mauris massa leo, congue id risus sed,
        facilisis gravida lorem. Etiam tincidunt tellus massa, quis consequat
        lectus blandit eu. Sed efficitur massa et massa varius, nec aliquam mi
        placerat. Etiam tincidunt tellus massa, quis consequat lectus blandit
        eu. Sed efficitur massa et massa varius, nec aliquam mi placerat.
        <ul className="w-full flex justify-end gap-x-2">
          <li className="link ig">Instagram</li>
          <li className="link yt">Youtube</li>
          <li className="link sy">Spotify</li>
        </ul>
      </div>
    </div>
  );
};

export default Bio;
