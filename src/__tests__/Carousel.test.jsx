import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../other-components/Carousel";
import { StaticRouter } from "react-router-dom/server"; // A browser router that can work in node.

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];

  // We dont wrap this in StaticRouter because theres no react router involved with this component
  const carousel = render(<Carousel images={images} />);

  // Does hero contain an image?
  const hero = await carousel.findByTestId("hero");
  expect(hero.src).toContain("0.jpg");

  // Does clicking through each image in the carousel work?
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const thumb = await carousel.findByTestId(`thumbnail${i}`);

    await thumb.click();
    expect(hero.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("active");
  }

  carousel.unmount();
});
