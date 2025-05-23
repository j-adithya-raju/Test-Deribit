import PageTitle from '@/components/PageTitle';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { Card, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Scrollbar'
};
const DefaultScroll = () => {
  return <Card>
      <CardHeader>
        <CardTitle as="h4">Default Scroll</CardTitle>
        <p className="text-muted mb-0">
          Just use data attribute <code>data-simplebar</code>
          and add <code>max-height: **px</code> oh fix height
        </p>
      </CardHeader>
      <SimplebarReactClient className="card-body py-0 my-3" data-simplebar style={{
      maxHeight: 250
    }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </Card>;
};
const RtlPosition = () => {
  return <Card>
      <CardHeader>
        <CardTitle as="h4">RTL Position</CardTitle>
        <p className="text-muted mb-0">
          Just use data attribute
          <code>data-simplebar data-simplebar-direction=&apos;rtl&apos;</code>
          and add <code>max-height: **px</code> oh fix height
        </p>
      </CardHeader>
      <SimplebarReactClient className="card-body py-0 my-3" data-simplebar data-simplebar-direction="rtl" style={{
      maxHeight: 250
    }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </Card>;
};
const ScrollSize = () => {
  return <Card>
      <CardHeader>
        <CardTitle as="h4">Scroll Size</CardTitle>
        <p className="text-muted mb-0">
          Just use data attribute <code>data-simplebar</code>
          and add <code>max-height: **px</code> oh fix height
        </p>
      </CardHeader>
      <SimplebarReactClient className="py-0 my-3 card-body" data-simplebar data-simplebar-lg style={{
      maxHeight: 250
    }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </Card>;
};
const ScrollColor = () => {
  return <Card>
      <CardHeader>
        <CardTitle as="h4">Scroll Color</CardTitle>
        <p className="text-muted mb-0">
          Just use data attribute
          <code>data-simplebar data-simplebar-primary</code>
          and add <code>max-height: **px</code> oh fix height
        </p>
      </CardHeader>
      <SimplebarReactClient className="card-body py-0 my-3" data-simplebar data-simplebar-primary style={{
      maxHeight: 250
    }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </Card>;
};
const Scrollbar = () => {
  return <>
      <PageTitle title="Scrollbar" />
      <Row>
        <Col xl={6}>
          <DefaultScroll />
        </Col>
        <Col xl={6}>
          <RtlPosition />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ScrollSize />
        </Col>
        <Col xl={6}>
          <ScrollColor />
        </Col>
      </Row>
    </>;
};
export default Scrollbar;